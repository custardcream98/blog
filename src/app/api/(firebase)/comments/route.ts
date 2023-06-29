import { encodeToPercentString, parseSearchParams } from "src/utils";

import type { TitleRequest } from "../_types";
import { getCollectionSnapshot, getCommentCollectionRef, getSnapshotData } from "../_utils";

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
  const comments = getSnapshotData(commentSnapshot);

  return NextResponse.json({ data: comments });
}
