// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager 
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA3CrereY__pI3owAcJRvvEmmTmfmfPj0",
  authDomain: "chaa-bagaan-web.firebaseapp.com",
  projectId: "chaa-bagaan-web",
  storageBucket: "chaa-bagaan-web.firebasestorage.app",
  messagingSenderId: "302316487208",
  appId: "1:302316487208:web:f88dedc87c6ff3d2862b1d",
  measurementId: "G-1192GRFCZB"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);

// Fast Loading & Offline Caching-সহ Firestore ইনিশিয়ালাইজেশন
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

export default app;