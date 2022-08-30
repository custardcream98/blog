import {
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  onSnapshot,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import ICommentData from "../../interfaces/comment";
import { fireStore } from "./";
import {
  COLLECTION_COMMENTS,
  COLLECTION_POSTS,
  COLLECTION_VIEWS,
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

const getPostDocRef = (title: string) =>
  doc(fireStore, COLLECTION_POSTS, title);

const getCommentCollectionRef = (title: string) =>
  collection(getPostDocRef(title), COLLECTION_COMMENTS);

export const getCommentDocRef = ({ title, commentId }: ICommentDocRefProps) =>
  doc(getPostDocRef(title), COLLECTION_COMMENTS, commentId);

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
