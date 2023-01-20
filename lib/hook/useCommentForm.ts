import { useCallback, useEffect, useState } from "react";

import { CommentEditState } from "../../@types/comment";
import { useCommentEditorStateSetter } from "../../components/Comments/CommentCard/CommentEditor/context";
import { useCommentDataContext } from "../../components/Comments/CommentCard/context";
import { useCommentPostTitleContext } from "../../components/Comments/context";
import { postMail } from "../axios";
import {
  addComment,
  updateComment,
} from "../firebaseSetup/firebaseApps";
import useEditable from "./useEditable";

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

  const [usernameRef, getUsername, clearUsername] =
    useEditable<HTMLInputElement>();

  const [passwordRef, getPassword, clearPassword] =
    useEditable<HTMLInputElement>();

  const [commentRef, getComment, clearComment] =
    useEditable<HTMLTextAreaElement>();

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
  ]);

  const handleCommentSubmit = useCallback(
    async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setIsLoading(true);

      const username = getUsername();
      const password = getPassword();
      const comment = getComment();

      if (
        !username ||
        !password ||
        !comment ||
        (password && password.length <= 4)
      ) {
        setIsLoading(false);
        throw Error("입력 오류");
      }

      if (isForEdit) {
        try {
          await updateComment({
            title,
            commentId,
            password,
            comment,
            username,
          });

          updateCommentData!({
            password,
            comment,
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
          title,
          password,
          comment,
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
    [title, commentId]
  );

  return {
    usernameRef,
    passwordRef,
    commentRef,
    isLoading,
    handleCommentSubmit,
  };
};

export default useCommentForm;
