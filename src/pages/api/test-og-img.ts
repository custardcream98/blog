import { generateThumbnailBuffer } from "src/lib/thumbnails/generateThumbnail";
import Template from "src/lib/thumbnails/Template";

import { NextApiRequest, NextApiResponse } from "next";

export default async function testOgAPI(req: NextApiRequest, res: NextApiResponse) {
  const { title, isLight } = req.query;
  const resolvedTitle =
    typeof title === "string" ? title : "테스트 타이틀? 테스트 타이틀! 이건: 테스트 타이틀";
  const resolvedIsLight = typeof isLight === "string" ? JSON.parse(isLight) : true;

  const buffer = await generateThumbnailBuffer(
    Template({
      isLight: resolvedIsLight,
      title: resolvedTitle,
    }),
  );

  res.setHeader("Content-Type", "image/webp");
  res.send(buffer);
}
