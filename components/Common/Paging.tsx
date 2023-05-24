import { Children } from "react";
import styled, { useTheme } from "styled-components";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Link from "next/link";

const Container = styled.nav`
  position: relative;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin: 0 7px;
  line-height: 24px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const PagenumList = styled.ol`
  display: flex;
  align-items: center;
`;

const LeftArrow = styled(StyledLink)`
  position: absolute;
  left: -30px;
`;

const RightArrow = styled(StyledLink)`
  position: absolute;
  right: -30px;
`;

const Pagenum = styled(StyledLink)`
  display: inline-block;
  color: ${(props) => props.theme.textColor};
  font-weight: 300;
`;

const Pagenum__selected = styled(Pagenum)`
  font-weight: 500;
  scale: 1.4;
`;

type Props = {
  pageScale: number;
  currentPage: number;
};

const Paging = ({ pageScale, currentPage }: Props) => {
  const theme = useTheme();

  return (
    <Container>
      {currentPage !== 1 && (
        <LeftArrow
          href={{
            pathname: "/",
            query: { page: currentPage - 1 },
          }}
        >
          <span className="sr-only">이전 글</span>
          <MdOutlineKeyboardArrowLeft
            color={theme.textColor}
            size="1.5rem"
          />
        </LeftArrow>
      )}
      <PagenumList>
        {Children.toArray(
          new Array(pageScale).fill(0).map((_, index) => (
            <li>
              {index + 1 === currentPage ? (
                <Pagenum__selected
                  href={{
                    pathname: "/",
                    query: { page: index + 1 },
                  }}
                >
                  {index + 1}
                </Pagenum__selected>
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
          ))
        )}
      </PagenumList>
      {currentPage !== pageScale && (
        <RightArrow
          href={{
            pathname: "/",
            query: { page: currentPage + 1 },
          }}
        >
          <span className="sr-only">다음 글</span>
          <MdOutlineKeyboardArrowRight
            color={theme.textColor}
            size="1.5rem"
          />
        </RightArrow>
      )}
    </Container>
  );
};

export default Paging;
