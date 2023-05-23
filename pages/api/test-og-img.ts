import Template from "lib/thumbnails/Template";
import { generateThumbnailBuffer } from "lib/thumbnails/generateThumbnail";
import { NextApiRequest, NextApiResponse } from "next";

export default async function testOgAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, isLight } = req.query;
  const resolvedTitle =
    typeof title === "string"
      ? title
      : "테스트 타이틀? 테스트 타이틀! 이건: 테스트 타이틀";
  const resolvedIsLight =
    typeof isLight === "string"
      ? JSON.parse(isLight)
      : true;

  const buffer = await generateThumbnailBuffer(
    Template({
      title: resolvedTitle,
      isLight: resolvedIsLight,
    })
  );

  res.setHeader("Content-Type", "image/webp");
  res.send(buffer);
}
