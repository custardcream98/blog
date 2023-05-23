import Template from "lib/thumbnails/Template";
import { wrapHtmlString } from "lib/thumbnails/generateThumbnail";
import { NextApiRequest, NextApiResponse } from "next";
import { renderToString } from "react-dom/server";

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

  const htmlString = renderToString(
    <Template
      title={resolvedTitle}
      isLight={resolvedIsLight}
    />
  );

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(wrapHtmlString(htmlString));
}
