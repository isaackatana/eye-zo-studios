import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

export async function createSong(data: {
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl: string;
  userId: string;
}) {
  await addDoc(collection(db, "songs"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function getSongs() {
  const q = query(
    collection(db, "songs"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getUserSongs(userId: string) {
  const q = query(
    collection(db, "songs"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}