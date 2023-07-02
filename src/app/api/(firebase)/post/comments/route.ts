import type { CommentData } from "src/types/comment";
import {
  encodeToPercentString,
  getRequestBody,
  parseSearchParams,
  sortObjectArray,
} from "src/utils";

import type { TitleRequest } from "../../_types";
import {
  addDoc,
  getCollection,
  getCommentDocRef,
  getCommentsCollectionRef,
  getDoc,
  getDocData,
  updateDoc,
} from "../../_utils";

import { type CollectionReference } from "firebase-admin/firestore";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export const getComments = async (
  commentsCollectionRef: CollectionReference<Omit<CommentData, "id">>,
) => {
  const commentSnapshot = await getCollection(commentsCollectionRef);
  const commentsUnordered = commentSnapshot.docs.map((doc) => ({ ...getDocData(doc), id: doc.id }));
  const comments = sortObjectArray(commentsUnordered, "createdAt");

  return comments;
};

export const getPostCommentsForHydration = async (title: string) => {
  const encodedTitle = encodeToPercentString(title);

  const commentsCollectionRef = getCommentsCollectionRef(encodedTitle);
  const comments = await getComments(commentsCollectionRef);

  return { comments };
};

export async function GET(request: Request): Promise<NextResponse> {
  const { title } = parseSearchParams<TitleRequest>(request.url);

  if (!title) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (title이 없습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const encodedTitle = encodeToPercentString(title);

  const commentsCollectionRef = getCommentsCollectionRef(encodedTitle);
  const comments = await getComments(commentsCollectionRef);

  return NextResponse.json({ data: { comments } });
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
  const commentsCollectionRef = getCommentsCollectionRef(encodedTitle);
  const newCommentDocData: Omit<CommentData, "id"> = {
    comment,
    createdAt: Date.now(),
    password,
    username,
  };

  const result = await addDoc(commentsCollectionRef, newCommentDocData);

  const comments = await getComments(commentsCollectionRef);

  return NextResponse.json({ data: { comments, created: result.id } });
}

export type PatchCommentRequestBody = PostCommentRequestBody & {
  id: string;
};
export async function PATCH(request: Request): Promise<NextResponse> {
  const { id, title, password, ...restData } = await getRequestBody<PatchCommentRequestBody>(
    request,
  );

  if (!id || !title || !password) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (id 혹은 title 혹은 password가 없습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const encodedTitle = encodeToPercentString(title);
  const commentDocRef = getCommentDocRef(encodedTitle, id);
  const commentDoc = await getDoc(commentDocRef);
  const commentDocData = getDocData(commentDoc);

  const isPasswordInvalid = commentDocData.password !== password;
  if (isPasswordInvalid) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (password가 일치하지 않습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const result = await updateDoc(commentDocRef, restData);

  const commentsCollectionRef = getCommentsCollectionRef(encodedTitle);
  const comments = await getComments(commentsCollectionRef);

  return NextResponse.json({ data: { comments, updatedAt: result.writeTime.toMillis() } });
}
