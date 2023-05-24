import { createContext, useContext } from "react";
import type { PropsWithChildren } from "react";

const CommentPostTitleContext = createContext({
  postTitle: "",
});

export const useCommentPostTitleContext = () => {
  const { postTitle } = useContext(CommentPostTitleContext);
  return postTitle;
};

type Props = PropsWithChildren<{
  postTitle: string;
}>;
const CommentPostTitleContextProvider = ({
  children,
  postTitle,
}: Props) => {
  return (
    <CommentPostTitleContext.Provider value={{ postTitle }}>
      {children}
    </CommentPostTitleContext.Provider>
  );
};

export default CommentPostTitleContextProvider;
