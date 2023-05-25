import CommentForm from "src/components/Comments/CommentForm";
import Button from "src/components/Common/Button";
import { CommentEditState } from "src/types/comment";

import { useCommentEditorStateSetter } from "../context";

import CommentOverlapWrapper from "./CommentOverlapWrapper";

import styled from "styled-components";

function CloseButton() {
  const { getStateSetter } = useCommentEditorStateSetter();

  return (
    <StyledButton
      width='40px'
      height='30px'
      isLoading={false}
      onClick={getStateSetter(CommentEditState.DEFAULT)}
    >
      취소
    </StyledButton>
  );
}

function EditState() {
  return (
    <CommentOverlapWrapper closer={<CloseButton />}>
      <CommentForm height='calc(100% - 10px)' isForEdit />
    </CommentOverlapWrapper>
  );
}

const StyledButton = styled(Button)`
  position: absolute;
  right: 82px;
  bottom: 16px;
`;

export default EditState;
