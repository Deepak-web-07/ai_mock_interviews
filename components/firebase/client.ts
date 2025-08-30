import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCz_VDAGxCa-8rfB4Z7465IlyoluNGE-Bc",
  authDomain: "prepwise-929c5.firebaseapp.com",
  projectId: "prepwise-929c5",
  storageBucket: "prepwise-929c5.firebasestorage.app",
  messagingSenderId: "138968140142",
  appId: "1:138968140142:web:c82e7871a417bb45c7997f",
  measurementId: "G-P5SHFT7WTK"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);