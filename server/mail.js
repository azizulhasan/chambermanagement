var nodemailer = require("nodemailer");
const Settings = require("./models/settings");


/**
 * Get email credentials from settings
 */
let credentials = {};
const getData = () => {
  Settings.find()
    .sort({ createdAt: -1 })

    .then((res) => {
      console.log(res)

      credentials.email = res[0].email;
      credentials.password = res[0].password;
    })
    .catch((err) => {
      console.log(err);
    });
};
getData()
console.log(credentials)
const sendMail = (data) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: credentials.email,
      pass: 'vzjwrmzjivvdpcqy', // credentials.password,
    },
  });
  var mailOptions = {
    from: data.email,
    to: credentials.email,
    subject: data.subject,
    text: data.message,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const getTimeInfo = (timeStart) => {
  let now = new Date()
  // let time = now.getTime()
  let timeEnd = timeStart + (60 * 5)
}

const sendMailForgotPassword = (data) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: credentials.email,
      pass: credentials.password,
    },
  });
  var mailOptions = {
    from: credentials.email,
    to: data.email,
    subject: ' Forgot Password',
    text: `Please <a href="asdfasdfasd" >Click Here</a> for setting password`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  sendMail,
  sendMailForgotPassword,
};
