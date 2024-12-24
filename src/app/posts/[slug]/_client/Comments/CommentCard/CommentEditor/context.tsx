import { CommentEditState, type ICommentEditorStateContext } from "src/types/comment"

import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react"

const CommentEditorStateContext = createContext<ICommentEditorStateContext>({
  changeStateTo: () => {},
  editState: CommentEditState.DEFAULT,
})

const useCommentEditorStateSetter = () => {
  const { changeStateTo } = useContext(CommentEditorStateContext)
  const getStateSetter = useCallback(
    (state: CommentEditState) => () => changeStateTo(state),
    [changeStateTo],
  )

  return { changeStateTo, getStateSetter }
}

const useCommentEditState = () => {
  const { editState } = useContext(CommentEditorStateContext)
  return editState
}

export { CommentEditorStateContext, useCommentEditorStateSetter, useCommentEditState }

function CommentEditorStateContextProvider({ children }: PropsWithChildren) {
  const [editState, setEditState] = useState<CommentEditState>(CommentEditState.DEFAULT)
  const commentEditorStateValue = useMemo(
    () => ({
      changeStateTo: setEditState,
      editState,
    }),
    [editState],
  )

  return (
    <CommentEditorStateContext.Provider value={commentEditorStateValue}>
      {children}
    </CommentEditorStateContext.Provider>
  )
}

export default CommentEditorStateContextProvider
