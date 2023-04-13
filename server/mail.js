var nodemailer = require("nodemailer");
const Settings = require("./models/settings");
const Users = require("./models/users");

const { getFomattedDate } = require("./utilities/utilities");

/**
 * Get email credentials from settings
 */
let credentials = {};
const getData = () => {
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


let doctorData = {}
const getUser = async (id) => {
  await Users.findById(id)

    .then((res) => {
      doctorData = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return true;
};




const sendMail = async (data) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: credentials.email,
      pass: credentials.password, // 'vzjwrmzjivvdpcqy', // 
    },
  });

  // Contact form
  var mailOptions = {}
  if (data.hasOwnProperty('subject')) {
    mailOptions = {
      from: data.email,
      to: credentials.email,
      subject: data.subject,
      text: data.hasOwnProperty('text') ? data.text : '', //TODO create a text format of this email.
      html: `<p>From ${data.name},</p>
        <p>${data.message}<p>
        <p><strong>Best Regards</strong></p>
        <p> ${process.env.SITE_NAME} </p>
        <p><small>This Software Developed by <a href="http://atlasaidev.com/contact-us/" target="_blank" >Atlas AiDev</a></small></p>
      `
    };
  } else {
    // schedule form
    let paymentStatus = ' Unpaid';
    let sessionFee = ' 5000TK';

    await getUser(data.doctor_id);

    mailOptions = {
      from: credentials.email,
      to: data.email,
      subject: "Your " + process.env.SITE_NAME + " - Booking is " + paymentStatus,
      text: data.hasOwnProperty('text') ? data.text : '', //TODO create a text format of this email.
      html: `<p>Hi ${data.name},</p>
        <p>You've booked a session name " ${data.session_name} " with ${doctorData.name} on <strong>${getFomattedDate(data.session_date)}</strong> at <strong>${data.session_time}</strong>
        for ${data.per_session_length} minutes.<p>
        <p> Payment Status:  ${paymentStatus}</p>
        <p> Session Fee:  ${sessionFee}</p>
        <p>If you're booking session for the first time then here is credentials for login.</p>
        <p>Email: ${data.email}</p>
        <p>Password: ${data.phone} </p>
        <p><strong>Best Regards</strong></p>
        <p> ${process.env.SITE_NAME} </p>
        <p><small>This Software Developed by <a href="http://atlasaidev.com/contact-us/" target="_blank" >Atlas AiDev</a></small></p>
      `,
    }
  }


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
