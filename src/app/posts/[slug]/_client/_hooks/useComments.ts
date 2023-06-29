import { getComments } from "src/lib/firebaseSetup/firebaseApps";
import type { CommentData } from "src/types/comment";

import { useEffect, useState } from "react";

export const useComments = (postTitle: string) => {
  const [comments, setComments] = useState<CommentData[]>([]);

  useEffect(() => {
    const unSubscribeComments = getComments(postTitle, setComments);

    return () => unSubscribeComments();
  }, [postTitle]);

  return comments;
};
