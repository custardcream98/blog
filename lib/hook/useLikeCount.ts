import { useCallback, useEffect, useState } from "react";
import {
  getLikeCount,
  setLikeCountDown,
  setLikeCountUp,
} from "../firebaseSetup/firebaseApps";
import {
  getIsLikedOnLocal,
  toggleIsLikedOnLocal,
} from "../localStorage";

export default (postTitle: string) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const toggleIsLiked = () => setIsLiked((prev) => !prev);

  useEffect(() => {
    setIsLiked(getIsLikedOnLocal(postTitle));

    const unSubscribeLikeCount = getLikeCount(
      postTitle,
      setLikeCount
    );

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

  return { likeCount, isLiked, onLikeClick };
};
