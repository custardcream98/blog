"use client";

import useLikeCount from "src/hook/useLikeCount";
import useViewCount from "src/hook/useViewCount";

import { IconContext } from "react-icons";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { HiEye } from "react-icons/hi";
import { utld } from "utility-class-components";

const HEART_COLOR = "text-[#c33434]";
const SUB_TEXT_COLOR = "text-default-sub-light dark:text-default-sub-dark";
const LIKE_ICON_STYLE_CONTEXT = {
  size: "1em",
  style: {
    strokeWidth: "0.7px",
    verticalAlign: "middle",
  },
};

const Container = utld.div`
  flex
  items-center
  h-[3.643rem]
`;

const CounterContainer = utld.em`
  ml-2
  flex
  items-center
`;

type LikeValueProps = {
  isLiked: boolean;
};

const LikeBtn = utld.button<LikeValueProps>`
  ml-4
  pt-[0.2rem]
  flex
  items-center
  bg-transparent
  border-none
  
  ${({ isLiked }) => (isLiked ? HEART_COLOR : SUB_TEXT_COLOR)}
`;

const Value = utld.span`
  ml-[0.3rem]
  text-[1rem]
  font-light
`;

const CounterValue = utld(Value)`
  text-default-sub-light
  dark:text-default-sub-dark
`;

const LikeValue = utld(Value)<LikeValueProps>`
 ${({ isLiked }) => (isLiked ? HEART_COLOR : SUB_TEXT_COLOR)}
`;

type Props = {
  title: string;
};

function ViewsLikesCounter({ title }: Props) {
  const viewCount = useViewCount(title);
  const { likeCount, isLiked, onLikeClick } = useLikeCount(title);

  return (
    <Container>
      <CounterContainer>
        <HiEye title='조회수' size={15} className={SUB_TEXT_COLOR} />
        <CounterValue>{viewCount}</CounterValue>
      </CounterContainer>
      <LikeBtn type='button' onClick={onLikeClick} isLiked={isLiked}>
        <IconContext.Provider value={LIKE_ICON_STYLE_CONTEXT}>
          {isLiked ? (
            <BsHeartFill title='좋아요 버튼' className={HEART_COLOR} />
          ) : (
            <BsHeart title='좋아요 버튼' className={SUB_TEXT_COLOR} />
          )}
        </IconContext.Provider>
        <LikeValue isLiked={isLiked}>{likeCount}</LikeValue>
      </LikeBtn>
    </Container>
  );
}

export default ViewsLikesCounter;
