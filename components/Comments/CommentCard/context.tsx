import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { PropsWithChildren } from "react";
import type { ICommentDataProps } from "../../../@types/comment";

interface ICommentDataContext extends ICommentDataProps {
  updateCommentData: ({
    comment,
    password,
    username,
  }: CommentDataUpdateProps) => void;
}

type CommentDataUpdateProps = Omit<
  Omit<ICommentDataProps, "commentId">,
  "createdAt"
>;

const CommentDataContext =
  createContext<ICommentDataContext>({
    commentId: "",
    comment: "",
    createdAt: 0,
    username: "",
    password: "",
    updateCommentData: () => {},
  });

const useCommentDataContext = () => {
  const commentData = useContext(CommentDataContext);
  return commentData;
};

const CommentDataContextProvider = ({
  children,
  ...props
}: PropsWithChildren<ICommentDataProps>) => {
  const [commentData, setCommentData] =
    useState<ICommentDataProps>(props);

  const updateCommentData = useCallback(
    ({
      comment,
      password,
      username,
    }: CommentDataUpdateProps) =>
      setCommentData(({ commentId, createdAt }) => ({
        commentId,
        createdAt,
        comment,
        password,
        username,
      })),
    []
  );

  return (
    <CommentDataContext.Provider
      value={{ ...commentData, updateCommentData }}
    >
      {children}
    </CommentDataContext.Provider>
  );
};

export {
  useCommentDataContext,
  CommentDataContextProvider,
};
