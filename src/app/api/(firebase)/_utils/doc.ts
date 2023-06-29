import { type DocumentData, type DocumentReference } from "firebase-admin/firestore";

export const getDoc = async (docRef: DocumentReference<DocumentData>) => {
  const doc = await docRef.get();
  return doc;
};

export const setDoc = async (docRef: DocumentReference<DocumentData>, data: DocumentData) => {
  const result = await docRef.set(data);
  return result;
};
