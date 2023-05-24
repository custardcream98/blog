import { useCommentEditState } from "./context";

import commentEditorStateChildrenMap from "./StateMap";

const CommentEditorContainer = () => {
  const editState = useCommentEditState();
  const State = commentEditorStateChildrenMap[editState];

  return <State />;
};

export default CommentEditorContainer;
