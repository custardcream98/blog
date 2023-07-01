import { type PatchPostCommentRequest } from "src/request/axios";
import type { ICommentDataProps } from "src/types/comment";

import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type CommentDataUpdateProps = Omit<PatchPostCommentRequest, "title" | "password" | "commentId">;
interface ICommentDataContext extends ICommentDataProps {
  updateCommentDataContext: ({ comment, username }: CommentDataUpdateProps) => void;
}

const CommentDataContext = createContext<ICommentDataContext>({
  comment: "",
  commentId: "",
  createdAt: 0,
  password: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateCommentDataContext: () => {},
  username: "",
});

const useCommentDataContext = () => {
  const commentData = useContext(CommentDataContext);
  return commentData;
};

function CommentDataContextProvider({ children, ...props }: PropsWithChildren<ICommentDataProps>) {
  const [commentData, setCommentData] = useState<ICommentDataProps>(props);

  const updateCommentDataContext = useCallback(
    (updateCommentProps: CommentDataUpdateProps) =>
      setCommentData((prevCommentData) => ({
        ...prevCommentData,
        ...updateCommentProps,
      })),
    [],
  );

  const commentDataValue = useMemo(
    () => ({ ...commentData, updateCommentDataContext }),
    [commentData, updateCommentDataContext],
  );

  return (
    <CommentDataContext.Provider value={commentDataValue}>{children}</CommentDataContext.Provider>
  );
}

export { useCommentDataContext, CommentDataContextProvider };
