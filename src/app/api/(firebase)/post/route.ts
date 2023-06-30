import { encodeToPercentString, getRequestBody } from "src/utils";

import type { TitleRequest } from "../_types";
import { getDoc, getPostDocRef, setDoc } from "../_utils";

import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

const DEFAULT_POST_DOC_DATA = { likes: 0, views: [] };

export async function POST(request: Request): Promise<NextResponse> {
  const { title } = await getRequestBody<TitleRequest>(request);

  if (!title) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (title이 없습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const encodedTitle = encodeToPercentString(title);

  const postDocRef = getPostDocRef(encodedTitle);
  const { exists: isDocExists } = await getDoc(postDocRef);

  if (!isDocExists) {
    const result = await setDoc(postDocRef, DEFAULT_POST_DOC_DATA);
    return NextResponse.json(
      { data: { createdAt: result.writeTime.toMillis() }, message: "Post Doc 생성 성공" },
      { status: StatusCodes.CREATED },
    );
  }

  return NextResponse.json({ message: "이미 존재하는 Post Doc 입니다." });
}
