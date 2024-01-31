const User = require("../modals/User");
const { getUserInfo } = require("../utils/googleOauth");
const jwt = require("jsonwebtoken");
const {
  createNewAccountEmail,
  sendAccountVerificationEmail,
} = require("../services/email.service");
const { transporter } = require("../config/nodemailer-setup");
const {
  validateRegisterInput,
  vailidateLoginInput,
  validateEmail,
} = require("../validations/user.validation");

// @desc    Sign in & Sign up with Google
// @route   POST /api/v1/auth/auth/goole
const googleAuthController = async (req, res) => {
  // Get Google authorization code from the request body
  const { code } = req.body;

  // Retrieve user information using the authorization code
  const { name, email, sub, email_verified, picture } = await getUserInfo(
    code,
    res
  );

  // Check if the email is verified
  if (!email_verified) {
    res.status(401);
    throw new Error("Email is not Verified !");
  }

  // Check if the user already exists in the user collection
  let user = await User.findOne({ email });

  //if user does not exist
  if (!user) {
    //create dummy Strong password
    let password = sub + process.env.DUMMY_PASSWORD_SECRET + email;
    // Create user
    user = await User.create({
      name,
      email,
      googleId: sub,
      picture,
      password,
      isVerified: true,
    });
  } else if (user && !user.googleId) {
    //if user already registered with Email and password
    //add google id
    user.googleId = sub;
    await user.save();
  }

  // Generate a JWT token for the user
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.SESSION_EXPIRATION,
  });

  // Prepare the response payload
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    picture: user.picture,
    token,
  };

  // Respond with success message and user information
  res.status(201).json({
    success: true,
    user: payload,
    message: "Signed in successfully",
  });
};

//@desc  Create unverifed User  & Send verificaion Email
//@route POST /api/v1/auth/local/singup
const signUpController = async (req, res) => {
  const { error } = validateRegisterInput(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  const { name, email, password } = req.body;

  // Check if the user already exists in the user collection
  const existingUser = await User.findOne({ email });

  // User already exists
  if (existingUser) {
    // User exists but hasn't verified, resend verification email
    if (!existingUser.isVerified) {
      await sendAccountVerificationEmail(existingUser);
      return res.status(400).json({
        success: false,
        message: "User exists but hasn't verified. Resent verification email.",
        status: "UserExistsNotVerified",
      });
    } else {
      // User exists and is verified
      return res.status(400).json({
        success: true,
        message: "User already exist .Try different Email .",
      });
    }
  }

  //create user with unverified flag
  const user = await User.create({ name, password, email, isVerified: false });

  // Send  verification email
  await sendAccountVerificationEmail(user);

  // Respond with success message
  res.status(200).json({
    success: true,
    message: `A verification link has been sent to ${email}`,
  });
};

//@desc  Login with Email & password
//@route POST /api/v1/auth/local/singin
const sigInController = async (req, res) => {
  const { email, password } = req.body;

  const { error } = vailidateLoginInput(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  //Check if User with provided email exist
  const user = await User.findOne({ email });
  //if no user or user is signed in with Google
  if (!user) {
    res.status(404);
    throw new Error("User does not exist,please Sign up");
  }

  //Check if the provided password is correct
  const isCorrectPassword = await user.comparePassword(password);

  if (!isCorrectPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Incorrect Password" });
  }

  //Generate a JWT token for user
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.SESSION_EXPIRATION,
  });

  //exclude password field in response payload
  user.password = undefined;

  //include token
  user.token = token;

  res.status(200).json({
    success: true,
    user,
    message: "Sign In success",
  });
};

//@desc Verify Email and Activate Account
//@route GET /api/v1/auth/email/verify/:token
const activationController = async (req, res) => {
  const { token } = req.params;
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    //Check for link expiration or any other error
    if (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: "Link expired ,Sign Up again ",
      });
    }

    //get decoded _id
    const { _id } = decoded;
    //Reterieve user with _id
    const user = await User.findById(_id);

    //If No user return Error
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email address!",
      });
    }

    //Check if user already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: true,
        message: "This account has already been verified. Please log in.",
      });
    }

    //save as verified user
    user.isVerified = true;
    await user.save();

    //Generate JWT token for user
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.SESSION_EXPIRATION,
    });

    //exclude password field in response payload
    user.password = undefined;

    //include token
    user.token = token;

    res.status(200).json({
      success: true,
      user,
      message: "Your account is Activated successfully",
    });

    // POST RESPONSE TASK

    //create a conformation Email
    const Email = createNewAccountEmail(user.email);

    //send conformation Email to Inform User
    transporter.sendMail(Email, (err) => {
      //log if any error
      if (err) {
        console.log(`Error while sending Email to ${user.email}`, err);
      }
    });
  });
};

//@desc Send conformation Link to email
//@route POST /api/v1/auth/email/conformation
const getConfirmationEmail = async (req, res) => {
  const { email } = req.body;
  const { error } = validateEmail(req.body);
  //handle any validation error
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const user = await User.findOne({ email });

  //if no user with provided email
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "No user found with this email address.",
    });
  }

  //if user is already verified
  if (user.isVerified) {
    return res.status(400).send({
      message: "This account has already been verified. Please log in.",
    });
  }

  //send verification email
  await sendAccountVerificationEmail(user);
  // Respond with success message
  res.status(200).json({
    success: true,
    message: `A verification link has been sent to ${email}`,
  });
};

module.exports = {
  googleAuthController,
  signUpController,
  sigInController,
  activationController,
  getConfirmationEmail,
};
