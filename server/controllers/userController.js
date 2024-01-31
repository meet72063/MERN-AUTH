const {
  createResetPasswordEmail,
  createNewPasswordEmail,
} = require("../services/email.service");
const { transporter } = require("../config/nodemailer-setup");
const User = require("../modals/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  validateEmail,
  validatePassword,
} = require("../validations/user.validation");

//@desc Send  password reset email
//@route  POST api/v1/user/password/forgot
const forgotPasswordController = async (req, res) => {
  const { error } = validateEmail(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  //Extract email from request body
  const { email } = req.body;

  //find User with Provided Email
  const user = await User.findOne({ email });

  //if No user Found
  if (!user) {
    res.status(404);
    throw new Error("User does not exist,please Sign up");
  }

  // Create a token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.PASSWORD_UPDATION_EMAIL_EXPIRATION,
  });

  //Create an Email  for Password Updation  with the token
  const Email = createResetPasswordEmail(email, token);

  //Send Email for Password Updation
  transporter.sendMail(Email, (err) => {
    // Handle error while sending email
    if (err) {
      console.log(`Error while sending Email to ${email}`, err);
      return res.status(500).json({
        success: false,
        message: `An Error Occured while sending  Email to ${email}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Email has been Sent to ${email} for password updation`,
    });
  });
};

//@desc Reset password
//@route POST /api/v1/user/password/reset/:verificationToken
const resetPasswordController = async (req, res) => {
  //Get verification Token from request params
  const { verificationToken } = req.params;
  //Get New Password from Request body
  const { newPassword } = req.body;

  const { error } = validatePassword({ password: newPassword });
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  //Verify Token
  jwt.verify(
    verificationToken,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      //if Token expired
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Link  Expired,Please Try Again",
        });
      }

      //Get User Id from the decoded value
      const { _id } = decoded;

      //Find User with the _id
      const user = await User.findById(_id);

      //if No user Found or unverified user
      if (!user || !user.isVerified) {
        return res.status(404).json({
          success: false,
          message: "User not Found",
        });
      }

      //hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedpasswd = await bcrypt.hash(newPassword, salt);

      //update password
      const updatedUser = await User.findOneAndUpdate(
        { _id },
        { password: hashedpasswd },
        { new: true }
      );

      //Send Success Response
      res.status(200).json({
        success: true,
        message: `Great! Now you can login with your new password`,
      });

      //POST RESPONSE TASK

      //create an Email
      const Email = createNewPasswordEmail(updatedUser.email);

      //Inform user about password updation via Email
      transporter.sendMail(Email, (err) => {
        //if any error
        if (err) {
          console.log(`Error while sending Email to ${updatedUser.email}`, err);
        }
      });
    }
  );
};

//@desc Get User Info
//@route GET api/v1/user/profile
//@access Private
const getUserProfile = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id, { name: 1, email: 1, picture: 1 });

  if (!user) {
    res.status(404);
    throw new Error("User Not found");
  }
  res.status(200).json({
    success: true,
    user,
  });
};

module.exports = {
  forgotPasswordController,
  resetPasswordController,
  getUserProfile,
};
