import { type CollectionReference } from "firebase-admin/firestore";

export const getCollectionSnapshot = async <T>(collectionRef: CollectionReference<T>) => {
  const snapshot = await collectionRef.get();
  return snapshot;
};
