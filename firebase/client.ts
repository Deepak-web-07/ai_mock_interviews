// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const db = getFirestore(app);