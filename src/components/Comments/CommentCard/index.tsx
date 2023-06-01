import DateSpan from "src/components/Common/DateSpan";
import type { ICommentDataProps } from "src/types/comment";

import CommentEditorStateContextProvider from "./CommentEditor/context";
import CommentEditor from "./CommentEditor";
import { CommentDataContextProvider } from "./context";

import { utld } from "utility-class-components";

type UserInfoProps = {
  username: string;
  createdAt: number;
};

function UserInfo({ username, createdAt }: UserInfoProps) {
  return (
    <UserInfoWrapper>
      <Username>{username}</Username>
      <CommentDate date={createdAt} />
    </UserInfoWrapper>
  );
}

export default function CommentCard({
  commentId,
  comment,
  createdAt,
  username,
  password,
}: ICommentDataProps) {
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
            <UserInfo username={username} createdAt={createdAt} />
            <CommentEditor />
          </CommentTopWrapper>
          <Content>{comment}</Content>
        </Wrapper>
      </CommentEditorStateContextProvider>
    </CommentDataContextProvider>
  );
}

const Wrapper = utld.li`
  relative
  py-6

  border-b
  border-solid
  border-default-sub-light
  dark:border-default-sub-dark

  overflow-hidden

  last:border-none
`;

const Content = utld.p`
  text-[0.9rem]
  leading-[1.4]
  font-light

  mobile:text-[0.8rem]
`;

const UserInfoWrapper = utld.p`
  flex-1
`;

const Username = utld.strong`
  block

  w-full
  text-[0.9rem]
  whitespace-nowrap
  overflow-hidden
  overflow-ellipsis

  mobile:text-[0.8rem]
`;

const CommentDate = utld(DateSpan)`
  text-[0.6rem]
  mobile:text-[0.5rem]
`;

const CommentTopWrapper = utld.div`
  flex

  justify-between
  items-center

  mb-2
`;
