const nodemailer = require("nodemailer");

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SERVICE_EMAIL,
    pass: process.env.SERVICE_EMAIL_PASSWORD,
  },
});

module.exports = { transporter };
