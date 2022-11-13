import { NextApiRequest, NextApiResponse } from "next";
import mailer from "../../lib/nodemailer";

export default async function sendMailToSwAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { postTitle, username, comment } = req.body;
    await mailer({
      receiverEmailAddress: process.env.EMAIL_RECEIVER!,
      title: `[기술블로그] "${postTitle}" 에 ${username}님이 댓글을 다셨습니다.`,
      content: `<h1>"${postTitle}" 에 ${username}님이 댓글을 다셨습니다.</h1><p>${comment}</p><p>바로 가기: <a href="${window.location.href}" target="_blank">${window.location.href}</a></p>`,
    });
    return res.status(200).json({ message: "이메일 전송 성공" });
  }
  return res.status(400).json({ message: "잘못된 HTTP method입니다." });
}