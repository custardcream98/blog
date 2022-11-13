import nodemailer from "nodemailer";

type Email = {
  receiverEmailAddress: string;
  title: string;
  content: string;
};

async function mailer({ receiverEmailAddress, title, content }: Email) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT!),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.verify((error, _) => {
    if (error) {
      console.log(error);
    } else {
      // console.log("로그인 성공");
    }
  });

  const message = {
    from: process.env.EMAIL_SENDER,
    to: receiverEmailAddress,
    subject: title,
    html: content,
  };

  transporter.sendMail(message, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      // console.log("Email sent: " + info.response);
    }
  });
}

export default mailer;
