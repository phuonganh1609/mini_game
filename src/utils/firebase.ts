// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0zCg-STuhyJh0sQ1ivpAZ0yO3WYh_L0A",
  authDomain: "mini-game-c81a2.firebaseapp.com",
  projectId: "mini-game-c81a2",
  storageBucket: "mini-game-c81a2.firebasestorage.app",
  messagingSenderId: "1092303437691",
  appId: "1:1092303437691:web:5c6622e98fed16186dc7de",
  measurementId: "G-99B78KVYGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);