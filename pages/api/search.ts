import type { NextApiRequest, NextApiResponse } from "next";

import type { SearchedPost } from "../../@types/searchedPosts";
import getFuzzyPostData from "../../lib/fuzzy";

const MAX_CONTENT_LENGTH = 100;
const koDtf = new Intl.DateTimeFormat("ko", {
  dateStyle: "short",
});

export default async function searchAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q } = req.query;

  if (req.method !== "GET" || typeof q !== "string") {
    return res
      .status(400)
      .json({ message: "잘못된 요청입니다." });
  }

  if (process.env.NODE_ENV === "development")
    console.log("요청 query: " + q);

  const results = q ? getFuzzyPostData(q).slice(0, 5) : [];
  let slicedResults: SearchedPost[] = [];

  results.forEach((result) => {
    if (typeof result.title === "object") {
      slicedResults.push({
        ...result,
        date: koDtf.format(new Date(result.date)),
        content:
          result.content.slice(0, MAX_CONTENT_LENGTH) +
          "...",
      });
    } else {
      let leftContentLength =
        MAX_CONTENT_LENGTH - result.content[1].length;
      const beforeMatchContentLength =
        Math.round(leftContentLength / 2) <=
        result.content[0].length
          ? Math.round(leftContentLength / 2)
          : result.content[0].length;
      const afterMatchContentLength =
        leftContentLength - beforeMatchContentLength;

      slicedResults.push({
        ...result,
        date: koDtf.format(new Date(result.date)),
        content: [
          (beforeMatchContentLength && "...") +
            result.content[0].slice(
              result.content[0].length -
                beforeMatchContentLength
            ),
          result.content[1],
          result.content[2].slice(
            0,
            afterMatchContentLength
          ) + (afterMatchContentLength && "..."),
        ],
      });
    }
  });

  if (process.env.NODE_ENV === "development")
    console.log("탐색 끝, 응답합니다.");

  return res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .json(slicedResults);
}
