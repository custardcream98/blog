import { useCommentEditState } from "./context";
import commentEditorStateChildrenMap from "./StateMap";

function CommentEditorContainer() {
  const editState = useCommentEditState();
  const State = commentEditorStateChildrenMap[editState];

  return <State />;
}

export default CommentEditorContainer;
