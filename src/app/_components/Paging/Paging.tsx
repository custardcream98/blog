import { generateNumberArray } from "src/utils";

import Link from "next/link";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ud, utld } from "utility-class-components";

type Props = {
  pageScale: number;
  currentPage: number;
};

export function Paging({ pageScale, currentPage }: Props) {
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
            pathname: "/",
            query: { page: prevPageNumber },
          }}
        >
          <span className='sr-only'>이전 글</span>
          <MdOutlineKeyboardArrowLeft
            className='text-default-light dark:text-default-dark'
            size='1.5rem'
          />
        </LeftArrow>
      )}
      <PagenumList>
        {pagesArray.map((pageNum) => (
          <li key={pageNum}>
            <Pagenum
              scroll={false}
              href={{
                pathname: "/",
                query: { page: pageNum },
              }}
              isSelectedPage={pageNum === currentPage}
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
            pathname: "/",
            query: { page: nextPageNumber },
          }}
        >
          <span className='sr-only'>다음 글</span>
          <MdOutlineKeyboardArrowRight
            className='text-default-light dark:text-default-dark'
            size='1.5rem'
          />
        </RightArrow>
      )}
    </Container>
  );
}

const Container = utld.nav`
  relative

  flex
  justify-center
`;

const StyledLink = utld(Link)`
  inline-block
  
  mx-[0.4375rem]
  leading-[1.5rem]

  hover:underline

  mobile:(text-[0.9rem] text-red)
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

const selectedPageNumStyle = ud`
  font-medium
  scale-[1.4]
`;

const Pagenum = utld(StyledLink)<{
  isSelectedPage: boolean;
}>`
  inline-block

  text-default-light
  dark:text-default-dark
  
  font-light

  ${({ isSelectedPage }) => isSelectedPage && selectedPageNumStyle}
`;
