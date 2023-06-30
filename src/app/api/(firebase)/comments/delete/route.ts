import { encodeToPercentString, getRequestBody } from "src/utils";

import { deleteDoc, getCommentDocRef, getDoc, getDocData } from "../../_utils";

import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export type DeleteCommentRequestBody = {
  commentId: string;
  title: string;
  password: string;
};
/**
 * Next.js 13.2.4 이후 DELETE 요청시 body가 사라지는 이슈가 있음. TODO: (fix되면 수정하기)
 */
export async function POST(request: Request): Promise<NextResponse> {
  const { commentId, title, password } = await getRequestBody<DeleteCommentRequestBody>(request);

  if (!commentId || !title || !password) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (commentId 혹은 title 혹은 password가 없습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const encodedTitle = encodeToPercentString(title);
  const commentDocRef = getCommentDocRef(encodedTitle, commentId);
  const commentDoc = await getDoc(commentDocRef);
  const commentDocData = getDocData(commentDoc);

  const isPasswordInvalid = commentDocData.password !== password;
  if (isPasswordInvalid) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (password가 일치하지 않습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const result = await deleteDoc(commentDocRef);

  return NextResponse.json({ data: { deletedAt: result.writeTime } });
}
