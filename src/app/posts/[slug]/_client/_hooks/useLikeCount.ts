import { getLikeCount, setLikeCountDown, setLikeCountUp } from "src/lib/firebaseSetup/firebaseApps";
import { getIsLikedOnLocal, toggleIsLikedOnLocal } from "src/lib/localStorage";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";

export const useLikeCount = (postTitle: string) => {
  const [likeCount, setLikeCount] = useState<number | undefined>();
  const [isLiked, setIsLiked] = useState(false);

  const toggleIsLiked = () => setIsLiked((prev) => !prev);

  useLayoutEffect(() => {
    setIsLiked(getIsLikedOnLocal(postTitle));
  }, [postTitle]);
  useEffect(() => {
    const unSubscribeLikeCount = getLikeCount(postTitle, setLikeCount);

    return () => unSubscribeLikeCount();
  }, [postTitle]);

  const onLikeClick = useCallback(async () => {
    toggleIsLikedOnLocal(postTitle);
    toggleIsLiked();

    if (isLiked) {
      await setLikeCountDown(postTitle);
    } else {
      await setLikeCountUp(postTitle);
    }
  }, [postTitle, isLiked]);

  return { isLiked, likeCount, onLikeClick };
};
