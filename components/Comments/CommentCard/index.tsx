import styled from "styled-components";

import CommentEditor from "./CommentEditor";
import DateSpan from "components/Common/DateSpan";
import { CommentDataContextProvider } from "./context";
import CommentEditorStateContextProvider from "./CommentEditor/context";
import type { ICommentDataProps } from "types/comment";

type UserInfoProps = {
  username: string;
  createdAt: number;
};

const UserInfo = ({
  username,
  createdAt,
}: UserInfoProps) => (
  <UserInfoWrapper>
    <Username>{username}</Username>
    <CommentDate date={createdAt} />
  </UserInfoWrapper>
);

const CommentCard = ({
  commentId,
  comment,
  createdAt,
  username,
  password,
}: ICommentDataProps) => {
  return (
    <CommentDataContextProvider
      commentId={commentId}
      comment={comment}
      createdAt={createdAt}
      username={username}
      password={password}
    >
      <CommentEditorStateContextProvider>
        <Wrapper>
          <CommentTopWrapper>
            <UserInfo
              username={username}
              createdAt={createdAt}
            />
            <CommentEditor />
          </CommentTopWrapper>
          <Content>{comment}</Content>
        </Wrapper>
      </CommentEditorStateContextProvider>
    </CommentDataContextProvider>
  );
};

const Wrapper = styled.li`
  position: relative;

  padding: 1.5rem 0;

  border-bottom: 1px solid
    ${({ theme }) => theme.subTextColor};
  &:last-child {
    /** :not() selector를 사용해도 됨 */
    border: none;
  }

  overflow: hidden;
`;

const Content = styled.p`
  font-size: 0.9rem;
  line-height: 1.4;
  font-weight: 300;

  @media (max-width: 780px) {
    font-size: 0.8rem;
  }
`;

const UserInfoWrapper = styled.p`
  flex: 1;
`;

const Username = styled.strong`
  display: block;

  width: 100%;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 780px) {
    font-size: 0.8rem;
  }
`;

const CommentDate = styled(DateSpan)`
  font-size: 0.6rem;
  @media (max-width: 780px) {
    font-size: 0.5rem;
  }
`;

const CommentTopWrapper = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export default CommentCard;
