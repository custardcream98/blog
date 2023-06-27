import type { ICommentDataProps } from "src/types/comment";

import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface ICommentDataContext extends ICommentDataProps {
  updateCommentData: ({ comment, password, username }: CommentDataUpdateProps) => void;
}

type CommentDataUpdateProps = Omit<Omit<ICommentDataProps, "commentId">, "createdAt">;

const CommentDataContext = createContext<ICommentDataContext>({
  comment: "",
  commentId: "",
  createdAt: 0,
  password: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateCommentData: () => {},
  username: "",
});

const useCommentDataContext = () => {
  const commentData = useContext(CommentDataContext);
  return commentData;
};

function CommentDataContextProvider({ children, ...props }: PropsWithChildren<ICommentDataProps>) {
  const [commentData, setCommentData] = useState<ICommentDataProps>(props);

  const updateCommentData = useCallback(
    ({ comment, password, username }: CommentDataUpdateProps) =>
      setCommentData(({ commentId, createdAt }) => ({
        comment,
        commentId,
        createdAt,
        password,
        username,
      })),
    [],
  );

  const commentDataValue = useMemo(
    () => ({ ...commentData, updateCommentData }),
    [commentData, updateCommentData],
  );

  return (
    <CommentDataContext.Provider value={commentDataValue}>{children}</CommentDataContext.Provider>
  );
}

export { useCommentDataContext, CommentDataContextProvider };
