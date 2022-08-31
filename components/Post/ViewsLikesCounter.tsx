import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { HiEye } from "react-icons/hi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import {
  getLikeCount,
  getViewCount,
  setLikeCountDown,
  setLikeCountUp,
} from "../../lib/firebaseSetup/firebaseApps";
import {
  toggleIsLikedOnLocal,
  getIsLikedOnLocal,
} from "../../lib/localStorage";
import { IconContext } from "react-icons";

const HEART_COLOR = "#c33434";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 3.643rem;
`;

const CounterContainer = styled.div`
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
  color: ${(props) => (props.isLiked ? HEART_COLOR : props.theme.subTextColor)};
  cursor: pointer;
`;

const Value = styled.span`
  margin-left: 0.3rem;
  vertical-align: center;
  font-size: 1rem;
  font-weight: 300;
`;

const CounterValue = styled(Value)`
  color: ${(props) => props.theme.subTextColor};
`;

const LikeValue = styled(Value)<LikeValueProps>`
  color: ${(props) => (props.isLiked ? HEART_COLOR : props.theme.subTextColor)};
`;

type Props = {
  title: string;
};

const ViewsLikesCounter = ({ title }: Props) => {
  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setIsLiked((_) => getIsLikedOnLocal(title));
    getViewCount(title, setViewCount);
    getLikeCount(title, setLikeCount);
  }, []);

  const toggleIsLiked = () => setIsLiked((prev) => !prev);

  const onLikeClick = async () => {
    toggleIsLikedOnLocal(title);
    toggleIsLiked();
    switch (isLiked) {
      case true:
        await setLikeCountDown(title);
        break;
      case false:
        await setLikeCountUp(title);
        break;
    }
  };

  return (
    <Container>
      <CounterContainer>
        <HiEye size={15} color={theme.subTextColor} />
        <CounterValue>{viewCount}</CounterValue>
      </CounterContainer>
      <LikeBtn onClick={onLikeClick} isLiked={isLiked}>
        <IconContext.Provider
          value={{
            size: "1em",
            style: { verticalAlign: "middle", strokeWidth: "0.7px" },
          }}
        >
          {isLiked ? (
            <BsHeartFill color={HEART_COLOR} />
          ) : (
            <BsHeart color={theme.subTextColor} />
          )}
        </IconContext.Provider>
        <LikeValue isLiked={isLiked}>{likeCount}</LikeValue>
      </LikeBtn>
    </Container>
  );
};

export default ViewsLikesCounter;
