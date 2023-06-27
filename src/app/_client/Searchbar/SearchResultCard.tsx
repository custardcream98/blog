import { ExternalLinkSvg } from "src/components/Svgs";

import { cssOutlineOnFocus } from "../Navigation/styles";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { utld } from "utility-class-components";

export const RESULT_LINK_CLASSNAME = "result-link";

type SearchResultCardProps = ComponentPropsWithoutRef<"a"> & {
  resultTitle: string;
  resultTitleNode: ReactNode;
  resultDateNode: ReactNode;
  contentNode: ReactNode;
  slug: string;
  isLast: boolean;
};

function SearchResultCard({
  resultTitle,
  resultTitleNode,
  resultDateNode,
  contentNode,
  slug,
  isLast,
  ...props
}: SearchResultCardProps) {
  return (
    <ResultCardItem $isLast={isLast}>
      <StyledLink href={`/posts/${slug}`} className={RESULT_LINK_CLASSNAME} {...props}>
        <ResultTitleWrapper>
          {resultTitleNode}
          {resultDateNode}
        </ResultTitleWrapper>
        <ResultContentWrapper>
          {contentNode}
          <ExternalLinkSvg
            svgTitle={`${resultTitle} 포스트로 이동하기`}
            className='h-5 w-5 self-end'
          />
        </ResultContentWrapper>
      </StyledLink>
    </ResultCardItem>
  );
}

type ResultCardItemProps = {
  $isLast: boolean;
};
const ResultCardItem = utld.li<ResultCardItemProps>`
  py-5

  ${({ $isLast }) =>
    !$isLast && "border-b border-solid border-default-sub-light dark:border-default-dark"}
`;

export const SearchResultCardTitle = utld.strong`
  block
  text-[1.1rem]
  mb-2.5
  leading-[1.5]

  mobile:(
    text-[0.9rem]
    mb-[0.3125rem]
  )
`;

export const SearchResultCardContent = utld.p`
  leading-[1.4]
  text-[0.9rem]
  font-light
  flex-1

  mobile:(
    text-[0.8rem]
    leading-[1.5]
  )
`;

export const SearchResultCardDate = utld.time`
  text-[0.8rem]
  font-light
  whitespace-nowrap
  
  mobile:text-[0.7rem]
`;

const StyledLink = utld(Link)`
  block

  hover:text-accent-light
  dark:hover:text-accent-dark
  transition-colors
  
  [&_svg]:(
    transition-[stroke,fill]
    text-default-light
    dark:text-default-dark
  )

  [&:hover_svg]:(
    text-accent-light 
    dark:text-accent-dark
  )

  ${cssOutlineOnFocus}
`;

const ResultTitleWrapper = utld.div`
  flex
  justify-between
  mobile:(
    flex-col
    mb-[0.625rem]
  )
`;

const ResultContentWrapper = utld.div`
  flex
`;

export default SearchResultCard;
