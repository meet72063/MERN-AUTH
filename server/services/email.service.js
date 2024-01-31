const { transporter } = require("../config/nodemailer-setup");
const jwt = require("jsonwebtoken");

const createVerificationEmail = (email, verificationToken) => {
  const verificationLink = `http://${process.env.CLIENT_HOST}/email/conformation/${verificationToken}`;

  return {
    to: email,
    subject: "Welcome to Skillbridge! Confirm Your Account",
    html: `
        <p>Hello there,</p>
        <p>Thank you for choosing Skillbridge, your gateway to mastering web development!</p>
        <p>To complete your registration and unlock access to our high-quality web development courses, please click the link below to verify your account:</p>
        <p><a href="${verificationLink}" style="text-decoration: none; color: #007bff;">Verify Your Account</a></p>
        <p>This link will expire in 30 minutes for security reasons. If you didn't request this verification, you can safely ignore this email.</p>
        <p>Happy coding!</p>
        <p>Best regards,<br>The Skillbridge Team</p>
      `,
  };
};

const createResetPasswordEmail = (email, verificationToken) => {
  const verificationLink = `http://${process.env.CLIENT_HOST}/password/reset/${verificationToken}`;

  return {
    to: email,
    subject: "Skillbridge Password Reset",
    html: `
        <p>Hi there,</p>
        <p>We received a request to change your Skillbridge account password. If this wasn't you, please ignore this email.</p>
        <p>Click the link below to set up a new password. This link will expire in 15 minutes for security reasons:</p>
        <p><a href="${verificationLink}" style="text-decoration: none; color: #007bff;">Change Password</a></p>
        <p>Happy coding!</p>
        <p>Best regards,<br>The Skillbridge Team</p>
      `,
  };
};

const createNewAccountEmail = (email) => {
  const skillbridgeLink = `http://${process.env.CLIENT_HOST}`;

  return {
    to: email,
    subject: "Skillbridge Account Verified!",
    html: `
        <p>Hello,</p>
        <p>Congratulations! Your email has been successfully verified, and you're now ready to dive into the world of web development with Skillbridge.</p>
        <h2>Start exploring now:</h2>
        <p><a href="${skillbridgeLink}" style="text-decoration: none; color: #007bff;">Go to Skillbridge</a></p>
        <p>Happy coding!</p>
        <p>Best regards,<br>The Skillbridge Team</p>
      `,
  };
};
const createNewPasswordEmail = (email) => {
  const skillbridgeLink = `http://${process.env.CLIENT_HOST}`;

  return {
    to: email,
    subject: "Skillbridge Password Reset Success!",
    html: `
        <p>Hello,</p>
        <p>Congratulations! Your Passowrd has updated Successfully!.Sign In with your new password</p>
        <p><a href="${skillbridgeLink}" style="text-decoration: none; color: #007bff;">Go to Skillbridge</a></p>
        <p>Happy coding!</p>
        <p>Best regards,<br>The Skillbridge Team</p>
      `,
  };
};

const sendAccountVerificationEmail = async (user) => {
  // Create a token for email verification
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.VERIFY_EMAIL_EXPIRATION,
  });

  // Create a verification email with the token
  const verificationEmail = createVerificationEmail(user.email, token);
  try {
    await transporter.sendMail(verificationEmail);
  } catch (err) {
    console.log(`error while sending Email to: ${user.email}`, err);
    // Handle error while sending verification email
    throw new Error(
      `Impossible to send an email to ${user.email}, try again. Our service may be down.`
    );
  }
};

module.exports = {
  createVerificationEmail,
  createResetPasswordEmail,
  createNewAccountEmail,
  createNewPasswordEmail,
  sendAccountVerificationEmail,
};
