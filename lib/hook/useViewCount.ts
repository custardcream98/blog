import { useEffect, useState } from "react";
import { getViewCount } from "../firebaseSetup/firebaseApps";

export default (postTitle: string) => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const unSubscribeViewCount = getViewCount(
      postTitle,
      setViewCount
    );

    return () => unSubscribeViewCount();
  }, [postTitle]);

  return viewCount;
};
