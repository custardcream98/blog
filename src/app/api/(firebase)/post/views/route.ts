import type { PostData } from "src/types/post";
import { encodeToPercentString, parseSearchParams } from "src/utils";

import type { TitleRequest } from "../../_types";
import { getDoc, getDocData, getPostDocRef, updateDoc } from "../../_utils";

import { type DocumentReference, FieldValue } from "firebase-admin/firestore";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

type GetViewsRequest = {
  viewedAt: number;
} & TitleRequest;

const VIEW_COUNT_INTERVAL = 1_200_000; // 20 minutes

const increaseViewCount = async (postDocRef: DocumentReference<PostData>, currentTime: number) => {
  const result = await updateDoc(postDocRef, { views: FieldValue.arrayUnion(currentTime) });

  return result;
};

export async function GET(request: Request): Promise<NextResponse> {
  const { title, viewedAt } = parseSearchParams<GetViewsRequest>(request.url);

  if (!title) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (title이 없습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const encodedTitle = encodeToPercentString(title);
  const postDocRef = getPostDocRef(encodedTitle);

  const isPostDocExist = (await getDoc(postDocRef)).exists;
  if (!isPostDocExist) {
    return NextResponse.json(
      { message: "존재하지 않는 Post Doc 입니다." },
      { status: StatusCodes.NOT_FOUND },
    );
  }

  const parsedViewedAt = Number(viewedAt);
  const currentTime = Date.now();
  const isViewCountShouldBeIncreased =
    isNaN(parsedViewedAt) || currentTime - parsedViewedAt > VIEW_COUNT_INTERVAL;

  if (isViewCountShouldBeIncreased) {
    await increaseViewCount(postDocRef, currentTime);
  }

  const postDoc = await getDoc(postDocRef);
  const { views } = getDocData(postDoc);

  return NextResponse.json({
    data: { isIncreased: isViewCountShouldBeIncreased, views: views.length },
  });
}

export const getPostViewsForHydration = async (title: string) => {
  const encodedTitle = encodeToPercentString(title);
  const postDocRef = getPostDocRef(encodedTitle);
  const postDoc = await getDoc(postDocRef);

  const { views } = getDocData(postDoc);

  return { views: views.length };
};
