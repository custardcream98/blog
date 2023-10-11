import { ExternalLinkSvg } from "src/components/Svgs";
import { addToClipboard } from "src/utils";

import { ud } from "utility-class-components";

const RESUME_LINK = "https://shiwoo.dev/resume";

const handleCopyResumeLink = async () => {
  await addToClipboard(RESUME_LINK);
  alert("이력서 링크를 복사했습니다 😄");
};

export function CopyLinkButton() {
  return (
    <button type='button' className={iconClickableStyle} onClick={handleCopyResumeLink}>
      <ExternalLinkSvg className='!fill-none' />
      링크 복사하기
    </button>
  );
}

const iconClickableStyle = ud`
  text-[0.9em]
  font-light

  border-t-[0]
  border-r-[0]
  border-l-[0]
  border-b
  border-solid
  border-resume-text-light
  dark:border-resume-text-dark
  break-keep

  transition-colors
  ease-in-out
  duration-200

  [&>span]:mr-[0.2em]

  [&_svg]:(
    inline-block
    mr-1
    fill-resume-text-light
    dark:fill-resume-text-dark
    transition-[fill]
    ease-in-out
    duration-200
    hover:fill-resume-accent-light
    dark:hover:fill-resume-accent-dark

    w-[0.95em]
    h-[0.95em]
  )

  hover:(
    text-resume-accent-light
    dark:text-resume-accent-dark

    border-resume-accent-light
    dark:border-resume-accent-dark
  )
`;
