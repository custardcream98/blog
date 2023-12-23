import { POSTS_SECTION_ID } from "src/app/constants";
import { generateNumberArray } from "src/utils";

import { CurrentPageIndicator } from "./CurrentPageIndicator.client";

import PostByPageArr from "cache/postByPageArr.json";
import Link from "next/link";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { ud, utld } from "utility-class-components";

const PAGE_SCALE = PostByPageArr.length;
const PAGE_NUMBER_SCALE = 5;
const PAGES_ARRAY = generateNumberArray(PAGE_SCALE, 1);
const slicePageNumbers = (currentPage: number) => {
  if (currentPage <= 3) {
    return PAGES_ARRAY.slice(0, PAGE_NUMBER_SCALE);
  }

  if (currentPage >= PAGE_SCALE - 2) {
    return PAGES_ARRAY.slice(PAGE_SCALE - PAGE_NUMBER_SCALE);
  }

  return PAGES_ARRAY.slice(currentPage - 3, currentPage + 2);
};

type PagingProps = {
  currentPage?: number;
};

export function Paging({ currentPage = 1 }: PagingProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === PAGE_SCALE;
  const prevPageNumber = currentPage - 1;
  const nextPageNumber = currentPage + 1;
  const lastPageNumber = PAGE_SCALE;
  const pageNumbers = slicePageNumbers(currentPage);

  return (
    <Container>
      {!isFirstPage && (
        <>
          <StyledLink
            href={{
              hash: POSTS_SECTION_ID,
              pathname: "/",
              query: { page: 1 },
            }}
          >
            <MdOutlineKeyboardDoubleArrowLeft title='첫 글' size='1.5rem' />
          </StyledLink>
          <StyledLink
            href={{
              hash: POSTS_SECTION_ID,
              pathname: "/",
              query: { page: prevPageNumber },
            }}
          >
            <MdOutlineKeyboardArrowLeft title='이전 글' size='1.5rem' />
          </StyledLink>
        </>
      )}
      <Container>
        <CurrentPageIndicator position={pageNumbers.indexOf(currentPage) + 1} />
        <PagenumList>
          {pageNumbers.map((pageNum) => (
            <li key={pageNum}>
              <Pagenum
                href={{
                  hash: POSTS_SECTION_ID,
                  pathname: "/",
                  query: { page: pageNum },
                }}
                $isSelectedPage={pageNum === currentPage}
              >
                {pageNum}
              </Pagenum>
            </li>
          ))}
        </PagenumList>
      </Container>
      {!isLastPage && (
        <>
          <StyledLink
            href={{
              hash: POSTS_SECTION_ID,
              pathname: "/",
              query: { page: nextPageNumber },
            }}
          >
            <MdOutlineKeyboardArrowRight title='다음 글' size='1.5rem' />
          </StyledLink>
          <StyledLink
            href={{
              hash: POSTS_SECTION_ID,
              pathname: "/",
              query: { page: lastPageNumber },
            }}
          >
            <MdOutlineKeyboardDoubleArrowRight title='마지막 글' size='1.5rem' />
          </StyledLink>
        </>
      )}
    </Container>
  );
}

const Container = utld.nav`
  relative

  flex
  justify-center
  items-center
`;

const StyledLink = utld(Link)`
  inline-block
  
  w-6
  h-6
  mx-1

  leading-[1.5rem]

  transition-colors

  mobile:(
    text-[0.9rem]
    mx-[0.1rem]
  )

  hover:(
    text-default-dark
    dark:text-default-light

    bg-gray-500
    dark:bg-gray-300
  )

  text-center

  rounded-[0.25rem]
`;

const PagenumList = utld.ol`
  flex
  items-center
`;

const Pagenum = utld(StyledLink)<{
  $isSelectedPage: boolean;
}>`
  font-light
  ${({ $isSelectedPage }) =>
    $isSelectedPage &&
    ud`
    duration-500
    pointer-events-none
    text-default-dark
    dark:text-default-light
    font-medium
  `}
`;
