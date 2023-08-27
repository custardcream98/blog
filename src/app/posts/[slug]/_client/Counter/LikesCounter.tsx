import { useLikeCount } from "../_hooks";

import { ComponentPropsWithoutRef } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { utld } from "utility-class-components";

type LikesCounterProps = ComponentPropsWithoutRef<"button"> & {
  title: string;
};

export function LikesCounter({ title }: LikesCounterProps) {
  const { likeCount, isLiked, handleLikeClick } = useLikeCount(title);
  const isLikeCountLoaded = likeCount !== undefined;

  if (!isLikeCountLoaded) return null;

  return (
    <LikeButton type='button' onClick={handleLikeClick} $isLiked={isLiked}>
      {isLiked ? (
        <BsHeartFill title='좋아요 버튼' width={16} height={16} strokeWidth={1} />
      ) : (
        <BsHeart title='좋아요 버튼' width={16} height={16} strokeWidth={1} />
      )}
      {isLikeCountLoaded && <LikeValue $isLiked={isLiked}>{likeCount}</LikeValue>}
    </LikeButton>
  );
}

const HEART_COLOR = "text-[#c33434]";
const SUB_TEXT_COLOR = "text-default-sub-light dark:text-default-sub-dark";
type LikeValueProps = {
  $isLiked: boolean;
};
const LikeButton = utld.button<LikeValueProps>`
  ml-3
  pt-[0.2rem]
  min-w-[2.3125rem]

  flex
  items-center
  justify-end

  bg-transparents
  border-none
  
  ${({ $isLiked }) => ($isLiked ? HEART_COLOR : SUB_TEXT_COLOR)}
`;

const LikeValue = utld.span<LikeValueProps>`
  ml-[0.3rem]
  text-[1rem]
  font-light
`;
