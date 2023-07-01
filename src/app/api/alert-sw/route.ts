import { sendMail } from "src/lib/nodemailer";
import type { AlertSWResponse } from "src/types/alertSW";
import { getRequestBody } from "src/utils";

import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

type RequestBody = { postTitle: string; username: string; comment: string; linkToPost: string };

export async function POST(request: Request): Promise<NextResponse<AlertSWResponse>> {
  const { postTitle, username, comment, linkToPost } = await getRequestBody<RequestBody>(request);

  const receiverEmailAddress = process.env.EMAIL_RECEIVER;
  if (!receiverEmailAddress) {
    return NextResponse.json(
      { message: "이메일 전송 실패 (Receiver가 없습니다.)" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }

  const content = `<h1>"${postTitle}" 에 ${username}님이 댓글을 다셨습니다.</h1><p>${comment}</p><p>바로 가기: <a href="${linkToPost}" target="_blank">${linkToPost}</a></p>`;
  const title = `[기술블로그] "${postTitle}" 에 ${username}님이 댓글을 다셨습니다.`;

  await sendMail({
    content,
    receiverEmailAddress,
    title,
  });

  return NextResponse.json({ message: "이메일 전송 성공" });
}
