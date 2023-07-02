import { useGetPostViewsQuery } from "src/request";

import { useLikeCount } from "./_hooks";

import { BsHeart, BsHeartFill } from "react-icons/bs";
import { HiEye } from "react-icons/hi";
import { utld } from "utility-class-components";

type ViewsLikesCounterProps = {
  title: string;
};

export function ViewsLikesCounter({ title }: ViewsLikesCounterProps) {
  const { data: viewsData } = useGetPostViewsQuery(title);
  const isViewCountLoaded = viewsData !== undefined;

  const { likeCount, isLiked, handleLikeClick } = useLikeCount(title);
  const isLikeCountLoaded = likeCount !== undefined;

  return (
    <Container>
      {isViewCountLoaded && (
        <CounterContainer>
          <HiEye title='조회수' size={15} className={SUB_TEXT_COLOR} />
          <CounterValue>{viewsData.views}</CounterValue>
        </CounterContainer>
      )}
      {isLikeCountLoaded && (
        <LikeBtn type='button' onClick={handleLikeClick} $isLiked={isLiked}>
          {isLiked ? (
            <BsHeartFill title='좋아요 버튼' width={16} height={16} strokeWidth={1} />
          ) : (
            <BsHeart title='좋아요 버튼' width={16} height={16} strokeWidth={1} />
          )}
          <LikeValue $isLiked={isLiked}>{likeCount}</LikeValue>
        </LikeBtn>
      )}
    </Container>
  );
}

const HEART_COLOR = "text-[#c33434]";
const SUB_TEXT_COLOR = "text-default-sub-light dark:text-default-sub-dark";

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
  $isLiked: boolean;
};

const LikeBtn = utld.button<LikeValueProps>`
  ml-4
  pt-[0.2rem]
  flex
  items-center
  bg-transparent
  border-none
  
  ${({ $isLiked }) => ($isLiked ? HEART_COLOR : SUB_TEXT_COLOR)}
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
 ${({ $isLiked }) => ($isLiked ? HEART_COLOR : SUB_TEXT_COLOR)}
`;
