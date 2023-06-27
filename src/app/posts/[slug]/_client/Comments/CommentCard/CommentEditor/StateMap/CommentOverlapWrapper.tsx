import { IconButton } from "src/components/client";
import { CommentEditState } from "src/types/comment";

import { useCommentEditorStateSetter } from "../context";

import { PropsWithChildren, ReactElement } from "react";
import { IoMdClose } from "react-icons/io";
import { utld } from "utility-class-components";

function CommentOverlapWrapper({ children, closer }: PropsWithChildren<{ closer: ReactElement }>) {
  return (
    <Wrapper>
      {children}
      {closer}
    </Wrapper>
  );
}

function CloseButtonWithIcon() {
  const { getStateSetter } = useCommentEditorStateSetter();

  return (
    <StyledIconButton
      icon={IoMdClose}
      title='닫기 버튼입니다.'
      onClick={getStateSetter(CommentEditState.DEFAULT)}
    />
  );
}

const Wrapper = utld.div`
  absolute
  inset-0

  flex
  justify-between
  items-center

  animate-show

  bg-bg-light
  dark:bg-bg-dark
`;

const StyledIconButton = utld(IconButton)`
  self-start
  mt-6
`;

CommentOverlapWrapper.CloseButtonWithIcon = CloseButtonWithIcon;

export default CommentOverlapWrapper;
