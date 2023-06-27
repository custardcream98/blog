import { LinkIcon } from "src/components";

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
          <LinkIcon className='link-icon' title={`${resultTitle} 포스트로 이동하기`} />
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

  ${cssOutlineOnFocus}

  [&_.link-icon]:(
    w-5
    h-5
    self-end

    stroke-default-light
    hover:stroke-accent-light

    dark:stroke-default-dark
    dark:hover:stroke-accent-dark
  )
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
