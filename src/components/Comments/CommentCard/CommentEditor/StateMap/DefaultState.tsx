import { FiMoreVertical } from "react-icons/fi";

import { CommentEditState } from "src/types/comment";
import IconButton from "src/components/Common/IconButton";
import { useCommentEditorStateSetter } from "../context";

const DefaultState = () => {
  const { getStateSetter } = useCommentEditorStateSetter();

  return (
    <IconButton
      icon={FiMoreVertical}
      title="댓글 옵션 보기 버튼입니다."
      onClick={getStateSetter(
        CommentEditState.OPTION_OPENED
      )}
    />
  );
};

export default DefaultState;
