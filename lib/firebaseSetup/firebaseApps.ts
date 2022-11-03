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
import { CollectionNames, DocumentKeys } from "./collectionNames";

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

const UTF8_ENCODER = new TextEncoder();

function percentEncode(str: string) {
  return Array.from(UTF8_ENCODER.encode(str))
    .map((i) => "%" + i.toString(16).toUpperCase().padStart(2, "0"))
    .join("");
}

const getPostDocRef = (title: string) =>
  doc(fireStore, CollectionNames.COLLECTION_POSTS, percentEncode(title));

export const createPostDoc = async (title: string) => {
  const postDocRef = getPostDocRef(title);

  try {
    const _ = await (await getDoc(postDocRef)).data()![DocumentKeys.KEY_VIEWS];
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
  collection(getPostDocRef(title), CollectionNames.COLLECTION_COMMENTS);

export const getCommentDocRef = ({ title, commentId }: ICommentDocRefProps) =>
  doc(getCommentCollectionRef(title), commentId);

export const deleteComment = async (docRef: DocumentReference<DocumentData>) =>
  await deleteDoc(docRef);

export const updateComment = async (docRef: DocumentReference<DocumentData>, commentText: string) =>
  await updateDoc(docRef, { comment: commentText });

export const addComment = async ({ title, password, comment, username }: IAddCommentProps) => {
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

  const unSubscribe = onSnapshot(commentCollectionRef, (snapshot) => {
    const commentsArr: ICommentData[] = [];
    snapshot.docs
      .sort((post1, post2) => (post1.data().createdAt > post2.data().createdAt ? -1 : 1))
      .map((doc) => commentsArr.push({ ...(doc.data() as ICommentData), id: doc.id }));
    setComments((_) => [...commentsArr]);
  });

  return unSubscribe;
};

/*
  Views
*/

export const getViewCount = (
  title: string,
  setViewCount: React.Dispatch<React.SetStateAction<number>>
) => {
  const postDocRef = getPostDocRef(title);
  const isViewAble = Date.now() - getViewedTimeOnLocal(title) > 1200000;

  if (isViewAble) {
    const time = Date.now();
    updateDoc(postDocRef, { views: arrayUnion(time) }).then((_) =>
      setViewedTimeOnLocal(title, time)
    );
  }

  const unSubscribe = onSnapshot(postDocRef, (post) =>
    setViewCount(post.data()![DocumentKeys.KEY_VIEWS].length)
  );

  return unSubscribe;
};

/*
  Likes
*/

export const getLikeCount = (
  title: string,
  setLikeCount: React.Dispatch<React.SetStateAction<number>>
) => {
  const postDocRef = getPostDocRef(title);

  const unSubscribe = onSnapshot(postDocRef, (post) =>
    setLikeCount(post.data()![DocumentKeys.KEY_LIKES])
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
