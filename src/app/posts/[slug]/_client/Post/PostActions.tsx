import { LinkSvg } from "src/components/Svgs";
import { copyLink } from "src/utils";

import { utld } from "utility-class-components";

const handleCopyPostLink = async () => {
  await copyLink();
  alert("링크를 복사했습니다 😄");
};

export function PostActions() {
  return (
    <button type='button' onClick={handleCopyPostLink}>
      <StyledLinkSvg svgTitle='글 링크 복사하기' />
    </button>
  );
}

const StyledLinkSvg = utld(LinkSvg)`
  text-default-sub-light
  dark:text-default-sub-dark

  w-5
  h-5
`;
