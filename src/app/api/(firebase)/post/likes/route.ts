import { encodeToPercentString, parseSearchParams } from "src/utils";

import { TitleRequest } from "../../_types";
import { getDoc, getDocData, getPostDocRef } from "../../_utils";

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
  const postDocRef = getPostDocRef(encodedTitle);
  const postDoc = await getDoc(postDocRef);
  const { likes } = getDocData(postDoc);

  return NextResponse.json({ data: { likes } });
}
