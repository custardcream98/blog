import { useEffect, useState } from "react";
import { getViewCount } from "lib/firebaseSetup/firebaseApps";

const useViewCount = (postTitle: string) => {
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

export default useViewCount;
