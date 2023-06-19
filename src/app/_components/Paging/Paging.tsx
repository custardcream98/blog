import { generateNumberArray } from "src/utils";

import { POSTS_SECTION_ID } from "../HeroPostsSection";

import Link from "next/link";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ud, utld } from "utility-class-components";

type PagingProps = {
  pageScale: number;
  currentPage: number;
};

export function Paging({ pageScale, currentPage }: PagingProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageScale;
  const prevPageNumber = currentPage - 1;
  const nextPageNumber = currentPage + 1;

  const pagesArray = generateNumberArray(pageScale, 1);

  return (
    <Container>
      {!isFirstPage && (
        <LeftArrow
          scroll={false}
          href={{
            hash: POSTS_SECTION_ID,
            pathname: "/",
            query: { page: prevPageNumber },
          }}
        >
          <span className='sr-only'>이전 글</span>
          <MdOutlineKeyboardArrowLeft size='1.5rem' />
        </LeftArrow>
      )}
      <PagenumList>
        {pagesArray.map((pageNum) => (
          <li key={pageNum}>
            <Pagenum
              scroll={false}
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
      {!isLastPage && (
        <RightArrow
          scroll={false}
          href={{
            hash: POSTS_SECTION_ID,
            pathname: "/",
            query: { page: nextPageNumber },
          }}
        >
          <span className='sr-only'>다음 글</span>
          <MdOutlineKeyboardArrowRight size='1.5rem' />
        </RightArrow>
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
  
  w-[1.5rem]
  h-[1.5rem]
  mx-[0.25rem]

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

const LeftArrow = utld(StyledLink)`
  absolute
  left-[-1.875rem]
`;

const RightArrow = utld(StyledLink)`
  absolute
  right-[-1.875rem]
`;

const Pagenum = utld(StyledLink)<{
  $isSelectedPage: boolean;
}>`
  font-light

  ${({ $isSelectedPage }) =>
    $isSelectedPage
      ? ud`
        text-default-dark
        dark:text-default-light

        bg-accent-light
        dark:bg-accent-dark

        pointer-events-none

        font-medium
        `
      : ud`
        text-default-light
        dark:text-default-dark
        `}
`;
