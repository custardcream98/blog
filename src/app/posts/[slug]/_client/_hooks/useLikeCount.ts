import { useLocalStorageState } from "src/hook";
import { useGetPostLikesQuery, usePatchPostLikesMutation } from "src/request";

import { useCallback } from "react";

const LOCALSTORAGE_IS_LIKED_KEY = "isLiked";
const getIsLikedLocalStorageKey = (title: string) => `${LOCALSTORAGE_IS_LIKED_KEY}-${title}`;

export const useLikeCount = (postTitle: string) => {
  const [isLiked, setIsLiked] = useLocalStorageState<boolean>(
    getIsLikedLocalStorageKey(postTitle),
    false,
  );
  const { data: likesData } = useGetPostLikesQuery(postTitle);
  const likeCount = likesData ? likesData.likes : undefined;

  const { mutate: mutatePatchPostLikes } = usePatchPostLikesMutation();

  const handleLikeClick = useCallback(() => {
    setIsLiked((isLikedPreviously) => {
      const nextIsLiked = !isLikedPreviously;

      mutatePatchPostLikes({ shouldLike: nextIsLiked, title: postTitle });

      return nextIsLiked;
    });
  }, [postTitle, mutatePatchPostLikes, setIsLiked]);

  return { handleLikeClick, isLiked, likeCount };
};
