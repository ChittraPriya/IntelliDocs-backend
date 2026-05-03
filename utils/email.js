const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

     await transporter.sendMail({
      from: `"IntelliDocs Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,

      // plain text fallback
      text: "You have a new document shared with you.",

      // HTML email
      html,

      // optional headers (advanced)
      headers: {
        "X-App-Name": "IntelliDocs",
        "X-Priority": "1"
      }
    });

  } catch (error) {
    console.log("Email error:", error.message);
  }
};

module.exports = sendEmail;