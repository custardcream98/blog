import { useCommentEditState } from "./context"
import commentEditorStateChildrenMap from "./StateMap"

function CommentEditorContainer() {
  const editState = useCommentEditState()

  return commentEditorStateChildrenMap[editState]
}

export default CommentEditorContainer
