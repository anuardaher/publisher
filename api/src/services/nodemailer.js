const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD // generated ethereal password
    }
  });

module.exports = transporter