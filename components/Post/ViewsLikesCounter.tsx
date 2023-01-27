import styled, { useTheme } from "styled-components";

import { IconContext } from "react-icons";
import { HiEye } from "react-icons/hi";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import useViewCount from "../../lib/hook/useViewCount";
import useLikeCount from "../../lib/hook/useLikeCount";

const HEART_COLOR = "#c33434";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 3.643rem;
`;

const CounterContainer = styled.em`
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
`;

type LikeValueProps = {
  isLiked: boolean;
};

const LikeBtn = styled.button<LikeValueProps>`
  margin-left: 1rem;
  padding: 0.2rem 0 0 0;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: ${({ isLiked, theme }) =>
    isLiked ? HEART_COLOR : theme.subTextColor};
  cursor: pointer;
`;

const Value = styled.span`
  margin-left: 0.3rem;
  vertical-align: center;
  font-size: 1rem;
  font-weight: 300;
`;

const CounterValue = styled(Value)`
  color: ${({ theme }) => theme.subTextColor};
`;

const LikeValue = styled(Value)<LikeValueProps>`
  color: ${({ isLiked, theme }) =>
    isLiked ? HEART_COLOR : theme.subTextColor};
`;

type Props = {
  title: string;
};

const ViewsLikesCounter = ({ title }: Props) => {
  const viewCount = useViewCount(title);
  const { likeCount, isLiked, onLikeClick } =
    useLikeCount(title);
  const theme = useTheme();

  return (
    <Container>
      <CounterContainer>
        <HiEye
          title="조회수"
          size={15}
          color={theme.subTextColor}
        />
        <CounterValue>{viewCount}</CounterValue>
      </CounterContainer>
      <LikeBtn
        type="button"
        onClick={onLikeClick}
        isLiked={isLiked}
      >
        <IconContext.Provider
          value={{
            size: "1em",
            style: {
              verticalAlign: "middle",
              strokeWidth: "0.7px",
            },
          }}
        >
          {isLiked ? (
            <BsHeartFill
              title="좋아요 버튼"
              color={HEART_COLOR}
            />
          ) : (
            <BsHeart
              title="좋아요 버튼"
              color={theme.subTextColor}
            />
          )}
        </IconContext.Provider>
        <LikeValue isLiked={isLiked}>{likeCount}</LikeValue>
      </LikeBtn>
    </Container>
  );
};

export default ViewsLikesCounter;
