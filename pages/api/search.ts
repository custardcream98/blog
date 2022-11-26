import { NextApiRequest, NextApiResponse } from "next";
import getFuzzyPostData from "../../lib/fuzzy";

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

  console.log("요청 query: " + q);

  const results = q ? getFuzzyPostData(q).slice(0, 5) : [];

  console.log("탐색 끝, 응답합니다.");

  return res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .json(results);
}
