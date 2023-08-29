import { createContext, useContext } from "react";

const CommentPostTitleContext = createContext("");

export const useCommentPostTitleContext = () => {
  const postTitle = useContext(CommentPostTitleContext);
  return postTitle;
};

type Props = React.PropsWithChildren<{
  postTitle: string;
}>;
function CommentPostTitleContextProvider({ children, postTitle }: Props) {
  return (
    <CommentPostTitleContext.Provider value={postTitle}>
      {children}
    </CommentPostTitleContext.Provider>
  );
}

export default CommentPostTitleContextProvider;
