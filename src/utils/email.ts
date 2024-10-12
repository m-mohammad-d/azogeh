import nodemailer from "nodemailer";

const sendEmail = async (email: string, message: string, subject: string) => {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: EMAIL_HOST,
    port: +EMAIL_PORT!,
    secure: true,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Hossein Rezaei <rezaeig22@gmail.com>",
    to: email,
    subject: subject,
    text: message,
    // html: ,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
