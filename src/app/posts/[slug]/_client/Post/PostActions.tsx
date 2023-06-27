import LinkSvg from "src/components/Svgs/LinkSvg";

import { utld } from "utility-class-components";

const copyLink = async () => {
  const currentUrl = window.location.href;
  await window.navigator.clipboard.writeText(currentUrl);
  alert("링크를 복사했습니다 😄");
};

export function PostActions() {
  return (
    <button type='button' onClick={copyLink}>
      <StyledLinkSvg title='글 링크 복사하기' />
    </button>
  );
}

const StyledLinkSvg = utld(LinkSvg)`
  text-default-sub-light
  dark:text-default-sub-dark

  w-5
  h-5
`;
