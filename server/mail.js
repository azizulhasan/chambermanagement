var nodemailer = require("nodemailer");
const Settings = require("./models/settings");


/**
 * Get email credentials from settings
 */
let credentials = {};
const getData =  () => {
  Settings.find()
    .sort({ createdAt: -1 })

    .then((res) => {
      credentials.email = res[0].email;
      credentials.password = res[0].password;
    })
    .catch((err) => {
      console.log(err);
    });
};
getData()
const sendMail = (data) => {
  // var transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: credentials.email,
  //     pass: credentials.password,
  //   },
  // });
  // var mailOptions = {
  //   from: data.email,
  //   to: credentials.email,
  //   subject: data.subject + " - " + data.email,
  //   text: data.message,
  // };
  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error.message);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
};

module.exports = {
  sendMail,
};
