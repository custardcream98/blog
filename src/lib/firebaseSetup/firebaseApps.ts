import { CommentData } from "src/types/comment";
import { encodeToPercentString } from "src/utils";

import { CollectionNames } from "./collectionNames";
import { fireStore } from ".";

import { FirebaseError } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

type CommentDocRefProps = {
  title: string;
  commentId: string;
};

/*
  Posts
*/

const getPostDocRef = (title: string) =>
  doc(fireStore, CollectionNames.COLLECTION_POSTS, encodeToPercentString(title));

export const createPostDoc = async (title: string) => {
  const postDocRef = getPostDocRef(title);
  const createDoc = () => setDoc(postDocRef, { likes: 0, views: [] });

  try {
    const isDocExists = (await getDoc(postDocRef)).exists();

    if (!isDocExists) {
      await createDoc();
    }
  } catch (e) {
    if (e instanceof FirebaseError) {
      if (e.code === "not-found") {
        await createDoc();
      }
    } else if (e instanceof TypeError) {
      await createDoc();
    }
  }
};

/*
  Comments
*/

const getCommentCollectionRef = (title: string) =>
  collection(getPostDocRef(title), CollectionNames.COLLECTION_COMMENTS);

export const getCommentDocRef = ({ title, commentId }: CommentDocRefProps) =>
  doc(getCommentCollectionRef(title), commentId);

export const deleteComment = async ({ title, commentId }: CommentDocRefProps) => {
  const commentDocRef = getCommentDocRef({
    commentId,
    title,
  });
  await deleteDoc(commentDocRef);
};

export type UpdateCommentProps = CommentDocRefProps & {
  username: string;
  password: string;
  comment: string;
};
export const updateComment = async ({
  title,
  commentId,
  username,
  password,
  comment,
}: UpdateCommentProps) => {
  const commentDocRef = getCommentDocRef({
    commentId,
    title,
  });
  await updateDoc(commentDocRef, {
    comment,
    password,
    username,
  });
};

export type AddCommentProps = {
  title: string;
  password: string;
  comment: string;
  username: string;
};
export const addComment = async ({ title, password, comment, username }: AddCommentProps) => {
  const commentCollectionRef = getCommentCollectionRef(title);
  await addDoc(commentCollectionRef, {
    comment,
    createdAt: Date.now(),
    password,
    username,
  });
};

export const getComments = (
  title: string,
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>,
) => {
  const commentCollectionRef = getCommentCollectionRef(title);

  const unSubscribe = onSnapshot(commentCollectionRef, (snapshot) => {
    const commentsArr: CommentData[] = [];
    snapshot.docs
      .sort((post1, post2) => post1.data().createdAt - post2.data().createdAt)
      .map((doc) =>
        commentsArr.push({
          ...(doc.data() as CommentData),
          id: doc.id,
        }),
      );
    setComments((_) => [...commentsArr]);
  });

  return unSubscribe;
};
