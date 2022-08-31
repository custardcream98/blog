import { FirebaseError } from "firebase/app";
import {
  doc,
  setDoc,
  addDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  collection,
  onSnapshot,
  DocumentData,
  DocumentReference,
  arrayUnion,
  increment,
} from "firebase/firestore";
import ICommentData from "../../interfaces/comment";
import { getViewedTimeOnLocal, setViewedTimeOnLocal } from "../localStorage";
import { fireStore } from "./";
import {
  COLLECTION_COMMENTS,
  COLLECTION_POSTS,
  KEY_LIKES,
  KEY_VIEWS,
} from "./collectionNames";

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
  doc(fireStore, COLLECTION_POSTS, encodeURI(title));

export const createPostDoc = async (title: string) => {
  const postDocRef = getPostDocRef(title);

  try {
    const _ = await (await getDoc(postDocRef)).data()![KEY_VIEWS];
  } catch (e) {
    if (e instanceof FirebaseError) {
      if (e.code === "not-found") {
        await setDoc(postDocRef, { views: [], likes: 0 });
      }
    } else if (e instanceof TypeError) {
      await setDoc(postDocRef, { views: [], likes: 0 });
    }
  }
};

/*
  Comments
*/

const getCommentCollectionRef = (title: string) =>
  collection(getPostDocRef(title), COLLECTION_COMMENTS);

export const getCommentDocRef = ({ title, commentId }: ICommentDocRefProps) =>
  doc(getCommentCollectionRef(title), commentId);

export const deleteComment = async (docRef: DocumentReference<DocumentData>) =>
  await deleteDoc(docRef);

export const updateComment = async (
  docRef: DocumentReference<DocumentData>,
  commentText: string
) => await updateDoc(docRef, { comment: commentText });

export const addComment = async ({
  title,
  password,
  comment,
  username,
}: IAddCommentProps) => {
  const commentCollectionRef = getCommentCollectionRef(title);
  await addDoc(commentCollectionRef, {
    createdAt: Date.now(),
    password,
    comment,
    username,
  });
};

export const getComments = (
  title: string,
  setComments: React.Dispatch<React.SetStateAction<ICommentData[]>>
) => {
  const commentCollectionRef = getCommentCollectionRef(title);

  onSnapshot(commentCollectionRef, (snapshot) => {
    const commentsArr: ICommentData[] = [];
    snapshot.docs
      .sort((post1, post2) =>
        post1.data().createdAt > post2.data().createdAt ? -1 : 1
      )
      .map((doc) =>
        commentsArr.push({ ...(doc.data() as ICommentData), id: doc.id })
      );
    setComments((_) => [...commentsArr]);
  });
};

/*
  Views
*/

export const getViewCount = async (
  title: string,
  setViewCount: React.Dispatch<React.SetStateAction<number>>
) => {
  const postDocRef = getPostDocRef(title);
  const isViewAble = Date.now() - getViewedTimeOnLocal(title) > 1200000;

  if (isViewAble) {
    const time = Date.now();
    await updateDoc(postDocRef, { views: arrayUnion(time) });
    setViewedTimeOnLocal(title, time);
  }

  onSnapshot(postDocRef, (post) =>
    setViewCount(post.data()![KEY_VIEWS].length)
  );
};

/*
  Likes
*/

export const getLikeCount = async (
  title: string,
  setLikeCount: React.Dispatch<React.SetStateAction<number>>
) => {
  const postDocRef = getPostDocRef(title);
  onSnapshot(postDocRef, (post) => setLikeCount(post.data()![KEY_LIKES]));
};

export const setLikeCountUp = async (title: string) => {
  const postDocRef = getPostDocRef(title);
  await updateDoc(postDocRef, { likes: increment(1) });
};

export const setLikeCountDown = async (title: string) => {
  const postDocRef = getPostDocRef(title);
  await updateDoc(postDocRef, { likes: increment(-1) });
};
