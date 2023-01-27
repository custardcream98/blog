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

const StyledLink = styled.a`
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

const getPath = (page: number) => `?page=${page}`;

const Paging = ({ pageScale, currentPage }: Props) => {
  const theme = useTheme();

  return (
    <Container>
      {currentPage !== 1 && (
        <Link href={getPath(currentPage - 1)} passHref>
          <LeftArrow>
            <span className="sr-only">이전 글</span>
            <MdOutlineKeyboardArrowLeft
              color={theme.textColor}
              size="1.5rem"
            />
          </LeftArrow>
        </Link>
      )}
      <PagenumList>
        {Children.toArray(
          new Array(pageScale).fill(0).map((_, index) => (
            <li>
              <Link href={getPath(index + 1)} passHref>
                {index + 1 === currentPage ? (
                  <Pagenum__selected>
                    {index + 1}
                  </Pagenum__selected>
                ) : (
                  <Pagenum>{index + 1}</Pagenum>
                )}
              </Link>
            </li>
          ))
        )}
      </PagenumList>
      {currentPage !== pageScale && (
        <Link href={getPath(currentPage + 1)} passHref>
          <RightArrow>
            <span className="sr-only">다음 글</span>
            <MdOutlineKeyboardArrowRight
              color={theme.textColor}
              size="1.5rem"
            />
          </RightArrow>
        </Link>
      )}
    </Container>
  );
};

export default Paging;
