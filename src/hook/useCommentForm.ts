import { useCommentEditorStateSetter } from "src/components/Comments/CommentCard/CommentEditor/context";
import { useCommentDataContext } from "src/components/Comments/CommentCard/context";
import { useCommentPostTitleContext } from "src/components/Comments/context";
import { postMail } from "src/lib/axios";
import { addComment, updateComment } from "src/lib/firebaseSetup/firebaseApps";
import { CommentEditState } from "src/types/comment";

import useEditable from "./useEditable";

import { useCallback, useEffect, useState } from "react";

const useCommentForm = (isForEdit: boolean) => {
  const {
    commentId,
    username: initialUsername,
    password: initialPassword,
    comment: initialComment,
    updateCommentData,
  } = useCommentDataContext();

  const title = useCommentPostTitleContext();
  const { changeStateTo } = useCommentEditorStateSetter();

  const [usernameRef, getUsername, clearUsername] = useEditable<HTMLInputElement>();

  const [passwordRef, getPassword, clearPassword] = useEditable<HTMLInputElement>();

  const [commentRef, getComment, clearComment] = useEditable<HTMLTextAreaElement>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      isForEdit &&
      initialUsername &&
      initialPassword &&
      initialComment &&
      usernameRef.current &&
      passwordRef.current &&
      commentRef.current
    ) {
      usernameRef.current.value = initialUsername;
      passwordRef.current.value = initialPassword;
      commentRef.current.value = initialComment;
    }
  }, [
    isForEdit,
    initialUsername,
    initialPassword,
    initialComment,
    usernameRef,
    passwordRef,
    commentRef,
  ]);

  const handleCommentSubmit = useCallback(
    async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setIsLoading(true);

      const username = getUsername();
      const password = getPassword();
      const comment = getComment();

      if (!username || !password || !comment) {
        setIsLoading(false);
        throw Error("입력 오류");
      } else if (password.length <= 3) {
        alert("비밀번호는 4자 이상 입력해주세요.");
        throw Error("비밀번호가 너무 짧습니다.");
      }

      if (isForEdit) {
        try {
          await updateComment({
            comment,
            commentId,
            password,
            title,
            username,
          });

          updateCommentData({
            comment,
            password,
            username,
          });
        } catch (error) {
          console.error(error);
          alert("댓글 수정중 오류가 발생했습니다.");
        }

        return changeStateTo(CommentEditState.DEFAULT);
      }

      try {
        await addComment({
          comment,
          password,
          title,
          username,
        });
      } catch (error) {
        console.error(error);
        alert("댓글 등록중 오류가 발생했습니다.");
      }

      postMail(title, username, comment);

      clearUsername();
      clearPassword();
      clearComment();

      setIsLoading(false);
    },
    [
      title,
      commentId,
      changeStateTo,
      clearComment,
      clearPassword,
      clearUsername,
      getComment,
      getPassword,
      getUsername,
      isForEdit,
      updateCommentData,
    ],
  );

  return {
    commentRef,
    handleCommentSubmit,
    isLoading,
    passwordRef,
    usernameRef,
  };
};

export default useCommentForm;
