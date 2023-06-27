import { LinkSvg } from "src/components/Svgs";
import { copyLink } from "src/utils";

import { iconClickableStyle } from "../_components";

const RESUME_LINK = "https://shiwoo.dev/resume";

const handleCopyResumeLink = async () => {
  await copyLink(RESUME_LINK);
  alert("이력서 링크를 복사했습니다 😄");
};

export function CopyLinkButton() {
  return (
    <button type='button' className={iconClickableStyle} onClick={handleCopyResumeLink}>
      <LinkSvg />
      링크 복사하기
    </button>
  );
}
