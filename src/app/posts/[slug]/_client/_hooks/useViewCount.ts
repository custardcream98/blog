import { getViewCount } from "src/lib/firebaseSetup/firebaseApps";

import { useEffect, useState } from "react";

export const useViewCount = (postTitle: string) => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const unSubscribeViewCount = getViewCount(postTitle, setViewCount);

    return () => unSubscribeViewCount();
  }, [postTitle]);

  return viewCount;
};
