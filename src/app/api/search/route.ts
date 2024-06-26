import { getFuzzyPostData } from "src/lib/fuzzy"
import type { SearchedPostCardDataRaw } from "src/types/searchedPosts"
import { parseSearchParams } from "src/utils"

import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"

const MAX_CONTENT_LENGTH = 100
const koDtf = new Intl.DateTimeFormat("ko", {
  dateStyle: "short",
})

type SearchParams = {
  q: string
}

export async function GET(request: Request) {
  const { q } = parseSearchParams<SearchParams>(request.url)

  if (q === undefined) {
    return NextResponse.json("잘못된 요청입니다.", { status: StatusCodes.BAD_REQUEST })
  }

  if (process.env.NODE_ENV === "development") {
    console.log("요청 query: " + q)
  }

  const results = q ? (await getFuzzyPostData(q)).slice(0, 5) : []
  const slicedResults: SearchedPostCardDataRaw[] = []

  results.forEach((result) => {
    if (typeof result.title === "object") {
      slicedResults.push({
        ...result,
        content: result.content.slice(0, MAX_CONTENT_LENGTH) + "...",
        date: koDtf.format(new Date(result.date)),
      })
    } else {
      const leftContentLength = MAX_CONTENT_LENGTH - result.content[1].length
      const beforeMatchContentLength =
        Math.round(leftContentLength / 2) <= result.content[0].length
          ? Math.round(leftContentLength / 2)
          : result.content[0].length
      const afterMatchContentLength = leftContentLength - beforeMatchContentLength

      slicedResults.push({
        ...result,
        content: [
          (beforeMatchContentLength && "...") +
            result.content[0].slice(result.content[0].length - beforeMatchContentLength),
          result.content[1],
          result.content[2].slice(0, afterMatchContentLength) + (afterMatchContentLength && "..."),
        ],
        date: koDtf.format(new Date(result.date)),
      })
    }
  })

  if (process.env.NODE_ENV === "development") {
    console.log("탐색 끝, 응답합니다.")
  }

  return NextResponse.json(slicedResults)
}
