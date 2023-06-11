import LinkSvg from "src/components/Svgs/LinkSvg";
import SvgContainer from "src/components/Svgs/SvgContainer";
import type { ResumeLink } from "src/types/resume";

import { ud, utld } from "utility-class-components";

export function ResumeLink({ url, name }: ResumeLink) {
  return (
    <StyledResumeLink href={url} target='_blank' rel='noopener noreferrer'>
      <SvgContainer svgWidth='0.95rem' svgHeight='0.95rem'>
        <LinkSvg />
      </SvgContainer>
      {name}
    </StyledResumeLink>
  );
}

export const iconClickableStyle = ud`
  text-[0.9rem]
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

  [&>span]:mr-[0.2rem]

  [&_svg]:(
    fill-resume-text-light
    dark:fill-resume-text-dark
    transition-[fill]
    ease-in-out
    duration-200
    hover:fill-resume-accent-light
    dark:hover:fill-resume-accent-dark
  )

  hover:(
    text-resume-accent-light
    dark:text-resume-accent-dark

    border-resume-accent-light
    dark:border-resume-accent-dark
  )
`;

const StyledResumeLink = utld.a`
  ${iconClickableStyle}
`;

export const ResumeLinksList = utld.ul`
  flex
  flex-wrap
  gap-[0.625rem]

  mb-[0.8rem]
  mt-4
  [ul+&]:mt-8

  print:(
    mt-[0.8rem]
    [ul+&]:mt-[0.8rem]

    last:mt-2
  )
`;
