import { getComments } from "src/lib/firebaseSetup/firebaseApps";
import type ICommentData from "src/types/comment";

import { useEffect, useState } from "react";

const useComments = (postTitle: string) => {
  const [comments, setComments] = useState<ICommentData[]>([]);

  useEffect(() => {
    const unSubscribeComments = getComments(postTitle, setComments);

    return () => unSubscribeComments();
  }, [postTitle]);

  return comments;
};

export default useComments;
