const nodemailer = require('nodemailer');

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  transport
    .sendMail({
      from: {
        name: process.env.NODEMAILER_NAME,
        address: process.env.NODEMAILER_EMAIL,
      },
      to: email,
      subject: 'Please confirm your account',
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Registration successful. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/user/confirm/${confirmationCode}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};
