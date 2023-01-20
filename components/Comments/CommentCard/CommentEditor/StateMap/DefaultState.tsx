import { IoIosMore } from "react-icons/io";

import { CommentEditState } from "../../../../../@types/comment";
import IconButton from "../../../../Common/IconButton";
import { useCommentEditorStateSetter } from "../context";

const DefaultState = () => {
  const { getStateSetter } = useCommentEditorStateSetter();

  return (
    <IconButton
      icon={IoIosMore}
      title="댓글 옵션 보기 버튼입니다."
      onClick={getStateSetter(
        CommentEditState.OPTION_OPENED
      )}
    />
  );
};

export default DefaultState;
