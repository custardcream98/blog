export default interface ICommentData {
  id: string;
  comment: string;
  createdAt: number;
  password: string;
  username: string;
}

interface ICommentDataWithoutId
  extends Omit<ICommentData, "id"> {}

enum CommentEditState {
  DEFAULT,
  OPTION_OPENED,
  CHECK_PASSWORD_EDIT,
  CHECK_PASSWORD_DELETE,
  EDIT,
  DELETE,
}

interface ICommentEditorStateContext {
  editState: CommentEditState;
  changeStateTo: (state: CommentEditState) => VoidFunction;
}

export { CommentEditState };
export type {
  ICommentDataWithoutId,
  ICommentEditorStateContext,
};
