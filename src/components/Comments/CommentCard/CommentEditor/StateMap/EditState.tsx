import CommentForm from "src/components/Comments/CommentForm";
import Button from "src/components/Common/Button";
import { CommentEditState } from "src/types/comment";

import { useCommentEditorStateSetter } from "../context";

import CommentOverlapWrapper from "./CommentOverlapWrapper";

import { utld } from "utility-class-components";

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

const StyledButton = utld(Button)`
  absolute
  right-[5.125rem]
  bottom-[1rem]
`;

export default EditState;
