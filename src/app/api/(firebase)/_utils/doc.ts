import {
  type CollectionReference,
  type DocumentData,
  type DocumentReference,
} from "firebase-admin/firestore";

export const getDoc = async <T>(docRef: DocumentReference<T>) => {
  const doc = await docRef.get();
  return doc;
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
