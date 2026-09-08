import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

const getMenuCollection = (uid) => {
  return collection(db, "businesses", uid, "menu");
};

export const getMenuItems = async (uid) => {
  const snapshot = await getDocs(
    getMenuCollection(uid)
  );

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
};

export const addMenuItem = async (uid, itemData) => {
  const menuRef = getMenuCollection(uid);

  const docRef = await addDoc(menuRef, {
    ...itemData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

export const updateMenuItem = async (
  uid,
  itemId,
  itemData
) => {
  const itemRef = doc(
    db,
    "businesses",
    uid,
    "menu",
    itemId
  );

  await updateDoc(itemRef, {
    ...itemData,
    updatedAt: serverTimestamp(),
  });
};

export const deleteMenuItem = async (
  uid,
  itemId
) => {
  const itemRef = doc(
    db,
    "businesses",
    uid,
    "menu",
    itemId
  );

  await deleteDoc(itemRef);
};