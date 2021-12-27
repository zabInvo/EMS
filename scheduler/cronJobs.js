const cron = require("node-cron");
const nodemailer = require("nodemailer");
require("dotenv").config();

cron.schedule("* * * * *", () => {
  console.log("Send Mail Running Every Minute ");
  sendEmail();
});

module.exports.sendEmail = async () => {
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "invozone.nodemailer@gmail.com",
      pass: "invozone",
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"EMS 👻" <invozone.nodemailer@gmail.com>', // sender address
    to: "zain.ali@invozone.com", // list of receivers
    subject: "Welcome ✔", // Subject line
    text: "Hello!", // plain text body
    html: "<b>Hello World</b>"
    // html: { path: "./mail.html" },
  });
  console.log("Message sent: %s", info.messageId);
  return info.messageId;
};
