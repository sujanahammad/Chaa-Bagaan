// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA3CrereY__pI3owAcJRvvEmmTmfmfPj0",
  authDomain: "chaa-bagaan-web.firebaseapp.com",
  projectId: "chaa-bagaan-web",
  storageBucket: "chaa-bagaan-web.firebasestorage.app",
  messagingSenderId: "302316487208",
  appId: "1:302316487208:web:f88dedc87c6ff3d2862b1d",
  measurementId: "G-1192GRFCZB"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);