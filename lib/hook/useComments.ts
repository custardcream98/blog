import { useEffect, useState } from "react";
import type ICommentData from "types/comment";
import { getComments } from "lib/firebaseSetup/firebaseApps";

export default (postTitle: string) => {
  const [comments, setComments] = useState<ICommentData[]>(
    []
  );

  useEffect(() => {
    const unSubscribeComments = getComments(
      postTitle,
      setComments
    );

    return () => unSubscribeComments();
  }, [postTitle]);

  return comments;
};
