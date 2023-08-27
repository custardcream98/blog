import { getPostViewsOnServerSide } from "src/lib/firebase/data/views";
import { parseSearchParams } from "src/utils";

import type { TitleRequest } from "../../_types";

import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

type GetViewsRequest = {
  viewedAt: number;
} & TitleRequest;

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
