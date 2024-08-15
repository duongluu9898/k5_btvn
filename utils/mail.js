const nodemailer = require("nodemailer");
const {
  SMTP_HOST,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  SMTP_SECURE,
  SMTP_PORT,
  SMTP_FROM_NAME,
  SMTP_FROM_EMAIL,
} = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE === "true", // Use `true` for port 465, `false` for all other ports
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

module.exports = (to, subject, content) => {
  return transporter.sendMail({
    from: `"${SMTP_FROM_NAME}" <${SMTP_FROM_EMAIL}>`,
    to,
    subject,
    html: content, // html body
  });
};
