import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import { CommentEditState } from "src/types/comment";
import IconButton from "src/components/Common/IconButton";
import { useCommentEditorStateSetter } from "../context";
import { keyframesShow } from "./styles";

const OptionOpenedState = () => {
  const { getStateSetter } = useCommentEditorStateSetter();

  return (
    <Wrapper>
      <IconButton
        icon={AiFillEdit}
        title="댓글 수정하기 버튼입니다."
        onClick={getStateSetter(
          CommentEditState.CHECK_PASSWORD_EDIT
        )}
      />
      <IconButton
        icon={MdDelete}
        title="댓글 삭제하기 버튼입니다."
        onClick={getStateSetter(
          CommentEditState.CHECK_PASSWORD_DELETE
        )}
      />
      <IconButton
        icon={IoMdClose}
        title="댓글 더보기 닫기 버튼입니다."
        onClick={getStateSetter(CommentEditState.DEFAULT)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  animation: ${keyframesShow} 0.2s ease;
  button {
    margin-left: 0.2rem;
  }
`;

export default OptionOpenedState;
