import { useLayoutEffect, useState } from "react";
import ICommentData from "../../interfaces/comment";
import { getComments } from "../../lib/firebaseSetup/firebaseApps";

type Props = {
  title: string;
};

export default ({ title }: Props) => {
  const [comments, setComments] = useState<ICommentData[]>(
    []
  );

  useLayoutEffect(() => {
    const unSubscribeComments = getComments(
      title,
      setComments
    );

    return () => unSubscribeComments();
  }, [title]);

  return comments;
};
