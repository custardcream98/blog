import { useEffect, useState } from "react";
import ICommentData from "../../@types/comment";
import { getComments } from "../firebaseSetup/firebaseApps";

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
