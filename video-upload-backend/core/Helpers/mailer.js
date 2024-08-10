import nodeMailer from "nodemailer";

const transporter = nodeMailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD,
  },
  secure: true,
});

export async function sendEmail(to, subject, htmlContent) {
  const mailOptions = {
    from: process.env.NODEMAILER_USERNAME,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
