import type { CommentData } from "src/types/comment";
import {
  encodeToPercentString,
  getRequestBody,
  parseSearchParams,
  sortObjectArray,
} from "src/utils";

import type { TitleRequest } from "../_types";
import {
  addDoc,
  getCollectionSnapshot,
  getCommentCollectionRef,
  getCommentDocRef,
  getDoc,
  updateDoc,
} from "../_utils";

import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { title } = parseSearchParams<TitleRequest>(request.url);

  if (!title) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (title이 없습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const encodedTitle = encodeToPercentString(title);

  const commentCollectionRef = getCommentCollectionRef(encodedTitle);

  const commentSnapshot = await getCollectionSnapshot(commentCollectionRef);
  const commentsUnordered = commentSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const comments = sortObjectArray(commentsUnordered, "createdAt");

  return NextResponse.json({ data: comments });
}

export type PostCommentRequestBody = {
  title: string;
  password: string;
  comment: string;
  username: string;
};
export async function POST(request: Request): Promise<NextResponse> {
  const { title, password, comment, username } = await getRequestBody<PostCommentRequestBody>(
    request,
  );

  if (!title || !password || !comment || !username) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (데이터가 없습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const isPasswordLengthInvalid = password.length <= 3;
  if (isPasswordLengthInvalid) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (password가 너무 짧습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const encodedTitle = encodeToPercentString(title);
  const commentCollectionRef = getCommentCollectionRef(encodedTitle);
  const newCommentDocData: Omit<CommentData, "id"> = {
    comment,
    createdAt: Date.now(),
    password,
    username,
  };

  const result = await addDoc(commentCollectionRef, newCommentDocData);

  return NextResponse.json({ data: { created: result.id } });
}

export type PatchCommentRequestBody = PostCommentRequestBody & {
  commentId: string;
};
export async function PATCH(request: Request): Promise<NextResponse> {
  const { commentId, title, password, ...restData } = await getRequestBody<PatchCommentRequestBody>(
    request,
  );

  if (!commentId || !title || !password) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (commentId 혹은 title 혹은 password가 없습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const encodedTitle = encodeToPercentString(title);
  const commentDocRef = getCommentDocRef(encodedTitle, commentId);
  const commentDoc = await getDoc(commentDocRef);
  const commentDocData = commentDoc.data();

  if (!commentDocData) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (해당하는 댓글이 없습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const isPasswordInvalid = commentDocData.password !== password;
  if (isPasswordInvalid) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (password가 일치하지 않습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const result = await updateDoc(commentDocRef, restData);

  return NextResponse.json({ data: { updatedAt: result.writeTime } });
}
