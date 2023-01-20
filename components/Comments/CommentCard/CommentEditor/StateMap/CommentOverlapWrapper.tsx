import { PropsWithChildren, ReactElement } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

import IconButton from "../../../../Common/IconButton";
import { useCommentEditorStateSetter } from "../context";
import { CommentEditState } from "../../../../../@types/comment";
import { keyframesShow } from "./styles";

const CommentOverlapWrapper = ({
  children,
  closer,
}: PropsWithChildren<{ closer: ReactElement }>) => {
  return (
    <Wrapper>
      {children}
      {closer}
    </Wrapper>
  );
};

const CloseButtonWithIcon = () => {
  const { getStateSetter } = useCommentEditorStateSetter();

  return (
    <StyledIconButton
      icon={IoMdClose}
      title="닫기 버튼입니다."
      onClick={getStateSetter(CommentEditState.DEFAULT)}
    />
  );
};

const Wrapper = styled.div`
  position: absolute;
  inset: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  animation: ${keyframesShow} 0.2s ease;

  background-color: ${({ theme }) => theme.bgColor};
`;

const StyledIconButton = styled(IconButton)`
  align-self: flex-start;
  margin-top: 1.5rem;
`;

CommentOverlapWrapper.CloseButtonWithIcon =
  CloseButtonWithIcon;

export default CommentOverlapWrapper;
