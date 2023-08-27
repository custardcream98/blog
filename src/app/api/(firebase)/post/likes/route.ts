import { getDoc, getDocData, getPostDocRef, updateDoc } from "src/lib/firebase/_utils";
import { getPostLikesOnServerSide } from "src/lib/firebase/data/likes";
import { encodeToPercentString, getRequestBody, parseSearchParams } from "src/utils";

import { TitleRequest } from "../../_types";

import { FieldValue } from "firebase-admin/firestore";
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

  const { likes } = await getPostLikesOnServerSide({ title });

  return NextResponse.json({ data: { likes } });
}

type PatchLikesRequest = {
  shouldLike: boolean;
} & TitleRequest;
export async function PATCH(request: Request): Promise<NextResponse> {
  const { title, shouldLike } = await getRequestBody<PatchLikesRequest>(request);

  if (!title || shouldLike === undefined) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (title 혹은 shouldLike가 없습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const encodedTitle = encodeToPercentString(title);
  const postDocRef = getPostDocRef(encodedTitle);
  const increment = shouldLike ? 1 : -1;

  await updateDoc(postDocRef, { likes: FieldValue.increment(increment) });

  const postDoc = await getDoc(postDocRef);
  const { likes } = getDocData(postDoc);

  return NextResponse.json({ data: { likes }, message: "Like 성공" });
}
