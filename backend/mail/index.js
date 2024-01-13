const nodemailer = require("nodemailer");
const transport = require("@/backend/config/mail");

const verificationMail = async (data) => {
  console.log(data);
  const mailOptions = {
    from: "from@example.com",
    to: "user1@example.com,",
    subject: "Your OTP for verification",
    text: "Hey there, it’s our first message sent with Nodemailer 😉 ",
    html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer",
  };
  // await transport.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log("Message sent: %s", info);
  // });
};

module.exports = { verificationMail };
