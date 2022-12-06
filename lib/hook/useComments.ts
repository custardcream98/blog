import { useLayoutEffect, useState } from "react";
import ICommentData from "../../interfaces/comment";
import { getComments } from "../firebaseSetup/firebaseApps";

export default (postTitle: string) => {
  const [comments, setComments] = useState<ICommentData[]>(
    []
  );

  useLayoutEffect(() => {
    const unSubscribeComments = getComments(
      postTitle,
      setComments
    );

    return () => unSubscribeComments();
  }, [postTitle]);

  return comments;
};
