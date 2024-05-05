import nodemailer from "nodemailer"

const TRANSPORT = {
  auth: {
    pass: process.env.EMAIL_PASSWORD,
    user: process.env.EMAIL_USER,
  },
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT as string, 10),
  secure: true,
  service: process.env.EMAIL_SERVICE,
} as const

type Email = {
  receiverEmailAddress: string
  title: string
  content: string
}
export const sendMail = async ({ receiverEmailAddress, title, content }: Email) => {
  const transporter = nodemailer.createTransport(TRANSPORT)

  await new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        console.log("nodemailer transporter 유효함")
        resolve(success)
      }
    })
  })

  const message = {
    from: process.env.EMAIL_SENDER,
    html: content,
    subject: title,
    to: receiverEmailAddress,
  }

  await new Promise((resolve, reject) => {
    transporter.sendMail(message, function (error, info) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        console.log("Email sent: " + info.response)
        resolve(info)
      }
    })
  })
}
