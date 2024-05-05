export interface CommentData {
  id: string
  comment: string
  createdAt: number
  password: string
  username: string
}

export type CommentDataWithoutPassword = Omit<CommentData, "password">

export type CommentDataContextType = Omit<CommentData, "id"> & {
  commentId: string
}

type ICommentDataProps = Omit<CommentDataContextType, "password">

enum CommentEditState {
  DEFAULT,
  OPTION_OPENED,
  CHECK_PASSWORD_EDIT,
  CHECK_PASSWORD_DELETE,
  EDIT,
  DELETE,
}

interface ICommentEditorStateContext {
  editState: CommentEditState
  changeStateTo: (state: CommentEditState) => void
}

export { CommentEditState }
export type { ICommentDataProps, ICommentEditorStateContext }
