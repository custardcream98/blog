import { getViewedTimeOnLocal, setViewedTimeOnLocal } from "src/lib/localStorage";
import { percentEncode } from "src/lib/utils/helper";
import ICommentData from "src/types/comment";

import { CollectionNames, DocumentKeys } from "./collectionNames";
import { fireStore } from ".";

import { FirebaseError } from "firebase/app";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

interface IAddCommentProps {
  title: string;
  password: string;
  comment: string;
  username: string;
}

interface ICommentDocRefProps {
  title: string;
  commentId: string;
}

/*
  Posts
*/

const getPostDocRef = (title: string) =>
  doc(fireStore, CollectionNames.COLLECTION_POSTS, percentEncode(title));

export const createPostDoc = async (title: string) => {
  const postDocRef = getPostDocRef(title);

  try {
    const _ = await (await getDoc(postDocRef)).data()?.[DocumentKeys.KEY_VIEWS];
  } catch (e) {
    if (e instanceof FirebaseError) {
      if (e.code === "not-found") {
        await setDoc(postDocRef, { likes: 0, views: [] });
      }
    } else if (e instanceof TypeError) {
      await setDoc(postDocRef, { likes: 0, views: [] });
    }
  }
};

/*
  Comments
*/

const getCommentCollectionRef = (title: string) =>
  collection(getPostDocRef(title), CollectionNames.COLLECTION_COMMENTS);

export const getCommentDocRef = ({ title, commentId }: ICommentDocRefProps) =>
  doc(getCommentCollectionRef(title), commentId);

export const deleteComment = async ({ title, commentId }: ICommentDocRefProps) => {
  const commentDocRef = getCommentDocRef({
    commentId,
    title,
  });
  await deleteDoc(commentDocRef);
};

type UpdateCommentProps = ICommentDocRefProps & {
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

export const addComment = async ({ title, password, comment, username }: IAddCommentProps) => {
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
  setComments: React.Dispatch<React.SetStateAction<ICommentData[]>>,
) => {
  const commentCollectionRef = getCommentCollectionRef(title);

  const unSubscribe = onSnapshot(commentCollectionRef, (snapshot) => {
    const commentsArr: ICommentData[] = [];
    snapshot.docs
      .sort((post1, post2) => post1.data().createdAt - post2.data().createdAt)
      .map((doc) =>
        commentsArr.push({
          ...(doc.data() as ICommentData),
          id: doc.id,
        }),
      );
    setComments((_) => [...commentsArr]);
  });

  return unSubscribe;
};

/*
  Views
*/

export const getViewCount = (
  title: string,
  setViewCount: React.Dispatch<React.SetStateAction<number>>,
) => {
  const postDocRef = getPostDocRef(title);
  const isViewAble = Date.now() - getViewedTimeOnLocal(title) > 1200000;

  if (isViewAble) {
    const time = Date.now();
    updateDoc(postDocRef, { views: arrayUnion(time) }).then((_) =>
      setViewedTimeOnLocal(title, time),
    );
  }

  const unSubscribe = onSnapshot(postDocRef, (post) =>
    setViewCount(post.data()?.[DocumentKeys.KEY_VIEWS].length),
  );

  return unSubscribe;
};

/*
  Likes
*/

export const getLikeCount = (
  title: string,
  setLikeCount: React.Dispatch<React.SetStateAction<number>>,
) => {
  const postDocRef = getPostDocRef(title);

  const unSubscribe = onSnapshot(postDocRef, (post) =>
    setLikeCount(post.data()?.[DocumentKeys.KEY_LIKES]),
  );

  return unSubscribe;
};

export const setLikeCountUp = async (title: string) => {
  const postDocRef = getPostDocRef(title);
  await updateDoc(postDocRef, { likes: increment(1) });
};

export const setLikeCountDown = async (title: string) => {
  const postDocRef = getPostDocRef(title);
  await updateDoc(postDocRef, { likes: increment(-1) });
};
