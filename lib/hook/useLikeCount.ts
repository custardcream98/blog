import {
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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

  useLayoutEffect(() => {
    setIsLiked((_) => getIsLikedOnLocal(postTitle));
  }, [postTitle]);

  useEffect(() => {
    const unSubscribeLikeCount = getLikeCount(
      postTitle,
      setLikeCount
    );

    return () => unSubscribeLikeCount();
  }, [postTitle]);

  const onLikeClick = async () => {
    toggleIsLikedOnLocal(postTitle);
    toggleIsLiked();
    switch (isLiked) {
      case true:
        await setLikeCountDown(postTitle);
        break;
      case false:
        await setLikeCountUp(postTitle);
        break;
    }
  };

  return { likeCount, isLiked, onLikeClick };
};
