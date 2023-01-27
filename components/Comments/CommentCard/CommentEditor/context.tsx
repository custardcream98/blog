import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { CommentEditState } from "../../../../@types/comment";
import type { ICommentEditorStateContext } from "../../../../@types/comment";

const CommentEditorStateContext =
  createContext<ICommentEditorStateContext>({
    editState: 0,
    changeStateTo: () => {},
  });

const useCommentEditorStateSetter = () => {
  const { changeStateTo } = useContext(
    CommentEditorStateContext
  );
  const getStateSetter = useCallback(
    (state: CommentEditState) => () => changeStateTo(state),
    [changeStateTo]
  );

  return { changeStateTo, getStateSetter };
};

const useCommentEditState = () => {
  const { editState } = useContext(
    CommentEditorStateContext
  );
  return editState;
};

export {
  CommentEditorStateContext,
  useCommentEditorStateSetter,
  useCommentEditState,
};

const CommentEditorStateContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [editState, setEditState] =
    useState<CommentEditState>(CommentEditState.DEFAULT);

  return (
    <CommentEditorStateContext.Provider
      value={{ editState, changeStateTo: setEditState }}
    >
      {children}
    </CommentEditorStateContext.Provider>
  );
};

export default CommentEditorStateContextProvider;
