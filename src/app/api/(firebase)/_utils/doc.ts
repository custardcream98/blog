import {
  type CollectionReference,
  type DocumentData,
  type DocumentReference,
  type DocumentSnapshot,
} from "firebase-admin/firestore";

export const getDoc = async <T>(docRef: DocumentReference<T>) => {
  const snapshot = await docRef.get();
  return snapshot;
};

export const getDocData = <T>(docSnapshot: DocumentSnapshot<T>) => {
  const isDocumentExists = docSnapshot.exists;

  if (!isDocumentExists) {
    throw new Error("Document not exists");
  }

  return docSnapshot.data() as T;
};

export const setDoc = async <T>(docRef: DocumentReference<T>, data: T) => {
  const result = await docRef.set(data);
  return result;
};

export const addDoc = async <T>(docRef: CollectionReference<T>, data: T) => {
  const result = await docRef.add(data);
  return result;
};

export const updateDoc = async (docRef: DocumentReference<DocumentData>, data: DocumentData) => {
  const result = await docRef.update(data);
  return result;
};

export const deleteDoc = async (docRef: DocumentReference<DocumentData>) => {
  const result = await docRef.delete();
  return result;
};

export const getCollection = async <T>(collectionRef: CollectionReference<T>) => {
  const snapshot = await collectionRef.get();
  return snapshot;
};
