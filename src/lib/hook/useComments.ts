import { useEffect, useState } from "react";
import type ICommentData from "src/types/comment";
import { getComments } from "src/lib/firebaseSetup/firebaseApps";

const useComments = (postTitle: string) => {
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

export default useComments;
