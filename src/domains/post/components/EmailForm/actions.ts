"use server"

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_UER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const isString = (value: unknown): value is string => typeof value === "string"

export const submitEmail = async (
  {
    slug,
    title,
  }: {
    slug: string
    title: string
  },
  previousState: { error: null | string; status: string },
  formData: FormData,
) => {
  if (previousState.error) {
    return Promise.resolve(previousState)
  }

  const comment = formData.get("comment")

  if (!isString(comment)) {
    return Promise.resolve({
      status: "error",
      error: "Invalid comment",
    })
  }

  const nickname = formData.get("nickname")
  const resolvedNickname = nickname && isString(nickname) ? nickname : "익명"

  const email = formData.get("email")
  const resolvedEmail = email && isString(email) ? email : "미기입"

  const resolvedComment = `
  블로그에 새 의견이 달렸습니다.

  ${resolvedNickname}님의 의견:
  ${comment}

  의견 보낸 사람 이메일: ${resolvedEmail}

  글 링크: https://shiwoo.dev/posts/${slug}
  `

  const mailOptions = {
    to: process.env.RECEIVE_EMAIL,
    subject: `[${title}] 블로그에 새 의견이 달렸습니다.`,
    text: resolvedComment,
  }

  try {
    await transporter.sendMail(mailOptions)
    return {
      status: "success",
      error: null,
    }
  } catch {
    return {
      status: "error",
      error: "Failed to send email",
    }
  }
}
