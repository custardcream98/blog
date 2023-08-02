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

export const getPostViewsOnServerSide = async ({
  title,
  viewedAt,
}: {
  title: string;
  viewedAt?: string;
}) => {
  const encodedTitle = encodeToPercentString(title);
  const postDocRef = getPostDocRef(encodedTitle);

  const isPostDocExist = (await getDoc(postDocRef)).exists;
  if (!isPostDocExist) {
    throw new Error("Not Found Post Doc");
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

  return { isViewCountShouldBeIncreased, views: views.length };
};

export async function GET(request: Request): Promise<NextResponse> {
  const { title, viewedAt } = parseSearchParams<GetViewsRequest>(request.url);

  if (!title) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (title이 없습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  try {
    const { views, isViewCountShouldBeIncreased } = await getPostViewsOnServerSide({
      title,
      viewedAt,
    });

    return NextResponse.json({
      data: { isIncreased: isViewCountShouldBeIncreased, views },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: StatusCodes.BAD_REQUEST });
    }

    return NextResponse.json(
      { message: "알 수 없는 에러가 발생했습니다." },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}
