import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

// Real-time listener function
export const subscribeToMenuItems = (userId, callback, onError) => {
  const q = query(
    collection(db, "menu"),
    where("userId", "==", userId)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(items);
    },
    (error) => {
      if (onError) onError(error);
    }
  );
};

// Add new menu item
export const addMenuItem = async (userId, itemData) => {
  return await addDoc(collection(db, "menu"), {
    ...itemData,
    userId,
    createdAt: serverTimestamp(),
  });
};

// Update existing menu item
export const updateMenuItem = async (userId, itemId, itemData) => {
  const itemRef = doc(db, "menu", itemId);
  return await updateDoc(itemRef, itemData);
};

// Delete menu item
export const deleteMenuItem = async (userId, itemId) => {
  const itemRef = doc(db, "menu", itemId);
  return await deleteDoc(itemRef);
};