import styled from "styled-components";

import { CommentEditState } from "../../../../../@types/comment";
import Button from "../../../../Common/Button";
import CommentForm from "../../../CommentForm";
import { useCommentEditorStateSetter } from "../context";
import CommentOverlapWrapper from "./CommentOverlapWrapper";

const CloseButton = () => {
  const { getStateSetter } = useCommentEditorStateSetter();

  return (
    <StyledButton
      width="40px"
      height="30px"
      isLoading={false}
      onClick={getStateSetter(CommentEditState.DEFAULT)}
    >
      취소
    </StyledButton>
  );
};

const EditState = () => {
  return (
    <CommentOverlapWrapper closer={<CloseButton />}>
      <CommentForm
        height="calc(100% - 10px)"
        isForEdit={true}
      />
    </CommentOverlapWrapper>
  );
};

const StyledButton = styled(Button)`
  position: absolute;
  right: 82px;
  bottom: 16px;
`;

export default EditState;
