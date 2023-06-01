import IconButton from "src/components/Common/IconButton";
import { CommentEditState } from "src/types/comment";

import { useCommentEditorStateSetter } from "../context";

import { FiMoreVertical } from "react-icons/fi";

function DefaultState() {
  const { getStateSetter } = useCommentEditorStateSetter();

  return (
    <IconButton
      icon={FiMoreVertical}
      title='댓글 옵션 보기 버튼입니다.'
      onClick={getStateSetter(CommentEditState.OPTION_OPENED)}
    />
  );
}

export default DefaultState;
