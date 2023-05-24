import { resolveURL } from "src/lib/utils/url";

const DEFAULT_KEYWORDS = ["HTML", "CSS", "JavaScript"];
const DEFAULT_DESCRIPTION =
  "예쁘고 간결한 것을 정말 좋아하는 개발자 박시우의 블로그입니다. 공부한 것들, 공유하고 싶은 내용을 올립니다.";
const DEFAULT_IMAGE = resolveURL(
  "/static/img/thumbnail.webp"
);
const DEFAULT_TITLE = "FE 개발자 박시우의 기술 블로그";

export {
  DEFAULT_KEYWORDS,
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  DEFAULT_TITLE,
};
