// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Optional, if you're using Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Optional, if you're using Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsCod6cW18SkGeBSKScVGIq06I7v0fdjQ",
  authDomain: "recipe-b6f55.firebaseapp.com",
  projectId: "recipe-b6f55",
  storageBucket: "recipe-b6f55.firebasestorage.app",
  messagingSenderId: "294603748294",
  appId: "1:294603748294:web:2844bee66ca453af1db8c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services (optional, based on what you're using)
export const auth = getAuth(app); // Firebase Authentication
export const db = getFirestore(app); // Firestore

export default app;
