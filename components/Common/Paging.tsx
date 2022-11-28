import styled, { useTheme } from "styled-components";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import React from "react";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  border: none;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const PagenumList = styled.ol`
  display: flex;
  align-items: center;
`;

const LeftArrow = styled(Btn)`
  position: absolute;
  left: -30px;
`;

const RightArrow = styled(Btn)`
  position: absolute;
  right: -30px;
`;

const Pagenum = styled(Btn)`
  color: ${(props) => props.theme.textColor};
  font-weight: 300;
  font-size: 1rem;
`;

const Pagenum__selected = styled(Pagenum)`
  font-weight: 900;
  scale: 1.5;
`;

type Props = {
  pageScale: number;
  currentPage: number;
  onPageChange: (to: number) => void;
};

const Paging = ({
  pageScale,
  currentPage,
  onPageChange,
}: Props) => {
  const theme = useTheme();

  const onClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const { value, name } = event.currentTarget;
    switch (name) {
      case "forward":
        onPageChange(currentPage - 1);
        break;
      case "backward":
        onPageChange(currentPage + 1);
        break;
      default:
        onPageChange(parseInt(value));
    }
  };

  return (
    <Container>
      {currentPage !== 0 && (
        <LeftArrow name="forward" onClick={onClick}>
          <span className="sr-only">이전 글</span>
          <MdOutlineKeyboardArrowLeft
            color={theme.textColor}
            size="1.5rem"
          />
        </LeftArrow>
      )}
      <PagenumList>
        {React.Children.toArray(
          new Array(pageScale).fill(0).map((_, index) => (
            <li>
              {index === currentPage ? (
                <Pagenum__selected
                  value={index}
                  onClick={onClick}
                >
                  {index + 1}
                </Pagenum__selected>
              ) : (
                <Pagenum value={index} onClick={onClick}>
                  {index + 1}
                </Pagenum>
              )}
            </li>
          ))
        )}
      </PagenumList>
      {currentPage !== pageScale - 1 && (
        <RightArrow name="backward" onClick={onClick}>
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
