const nodemailer = require("nodemailer");
function sendMail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "hoangpn2201@gmail.com",
      pass: "Hoang123@"
    }
  });
  let mailOptions = {
    from: "Admin",
    to: to,
    subject: subject,
    text: text
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
  });
}
module.exports = sendMail