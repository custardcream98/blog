import { type PatchPostCommentRequest } from "src/request/axios"
import type { CommentDataContextType, ICommentDataProps } from "src/types/comment"

import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

type CommentDataUpdateProps = Omit<PatchPostCommentRequest, "title" | "password" | "commentId">
interface CommentDataContext extends CommentDataContextType {
  password: string
  initializePassword: (password: string) => void
  updateCommentDataContext: ({ comment, username }: CommentDataUpdateProps) => void
}

const CommentDataContext = createContext<CommentDataContext>({
  comment: "",
  commentId: "",
  createdAt: 0,
  initializePassword: () => null,
  password: "",
  updateCommentDataContext: () => null,
  username: "",
})

const useCommentDataContext = () => {
  const commentData = useContext(CommentDataContext)
  return commentData
}

function CommentDataContextProvider({ children, ...props }: PropsWithChildren<ICommentDataProps>) {
  const [commentData, setCommentData] = useState<
    ICommentDataProps & {
      password: string
    }
  >({
    ...props,
    password: "",
  })

  const updateCommentDataContext = useCallback(
    (updateCommentProps: CommentDataUpdateProps) =>
      setCommentData((prevCommentData) => ({
        ...prevCommentData,
        ...updateCommentProps,
      })),
    [],
  )

  const initializePassword = useCallback(
    (password: string) =>
      setCommentData((prevCommentData) => ({
        ...prevCommentData,
        password,
      })),
    [],
  )

  const commentDataValue = useMemo(
    () => ({ ...commentData, initializePassword, updateCommentDataContext }),
    [commentData, initializePassword, updateCommentDataContext],
  )

  return (
    <CommentDataContext.Provider value={commentDataValue}>{children}</CommentDataContext.Provider>
  )
}

export { useCommentDataContext, CommentDataContextProvider }
