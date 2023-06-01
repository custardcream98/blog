import { getLikeCount, setLikeCountDown, setLikeCountUp } from "src/lib/firebaseSetup/firebaseApps";
import { getIsLikedOnLocal, toggleIsLikedOnLocal } from "src/lib/localStorage";

import { useCallback, useEffect, useState } from "react";

const useLikeCount = (postTitle: string) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const toggleIsLiked = () => setIsLiked((prev) => !prev);

  useEffect(() => {
    setIsLiked(getIsLikedOnLocal(postTitle));

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

export default useLikeCount;
