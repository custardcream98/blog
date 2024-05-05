import React, { useContext } from "react"

export const CommentPostTitleContext = React.createContext("")

export const useCommentPostTitleContext = () => {
  const postTitle = useContext(CommentPostTitleContext)
  return postTitle
}
