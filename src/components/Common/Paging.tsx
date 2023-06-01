import Link from "next/link";
import { Children } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { utld } from "utility-class-components";

type Props = {
  pageScale: number;
  currentPage: number;
};

export default function Paging({ pageScale, currentPage }: Props) {
  return (
    <Container>
      {currentPage !== 1 && (
        <LeftArrow
          href={{
            pathname: "/",
            query: { page: currentPage - 1 },
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
        {Children.toArray(
          new Array(pageScale).fill(0).map((_, index) => (
            <li>
              {index + 1 === currentPage ? (
                <SelectedPagenum
                  href={{
                    pathname: "/",
                    query: { page: index + 1 },
                  }}
                >
                  {index + 1}
                </SelectedPagenum>
              ) : (
                <Pagenum
                  href={{
                    pathname: "/",
                    query: { page: index + 1 },
                  }}
                >
                  {index + 1}
                </Pagenum>
              )}
            </li>
          )),
        )}
      </PagenumList>
      {currentPage !== pageScale && (
        <RightArrow
          href={{
            pathname: "/",
            query: { page: currentPage + 1 },
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

const Pagenum = utld(StyledLink)`
  inline-block

  text-default-light
  dark:text-default-dark
  
  font-light
`;

const SelectedPagenum = utld(Pagenum)`
  font-medium
  scale-[1.4]
`;
