const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Configure your primary email service
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service provider if not using Gmail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (to, subject, text) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};

module.exports = { sendEmail };
