const nodemailer = require("nodemailer");
const config = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
};

const transport = nodemailer.createTransport(config);

module.exports = transport;
