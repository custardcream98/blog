import mailer from "src/lib/nodemailer";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { postTitle, username, comment, linkToPost } = await request.json();

  await mailer({
    content: `<h1>"${postTitle}" 에 ${username}님이 댓글을 다셨습니다.</h1><p>${comment}</p><p>바로 가기: <a href="${linkToPost}" target="_blank">${linkToPost}</a></p>`,
    receiverEmailAddress: process.env.EMAIL_RECEIVER as string,
    title: `[기술블로그] "${postTitle}" 에 ${username}님이 댓글을 다셨습니다.`,
  });

  return NextResponse.json({ message: "이메일 전송 성공" });
}
