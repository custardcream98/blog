import { type CollectionReference, type QuerySnapshot } from "firebase-admin/firestore";

export const getCollectionSnapshot = async <T>(collectionRef: CollectionReference<T>) => {
  const snapshot = await collectionRef.get();
  return snapshot;
};

export const getSnapshotData = <T>(snapshot: QuerySnapshot<T>) => {
  const data = snapshot.docs.map((doc) => doc.data());
  return data;
};
