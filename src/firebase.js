import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBChmXeYlKk3p66Ufuz-4PoDCSBogQ0cLk",
  authDomain: "linkedin-clone-yt-2b65a.firebaseapp.com",
  projectId: "linkedin-clone-yt-2b65a",
  storageBucket: "linkedin-clone-yt-2b65a.appspot.com",
  messagingSenderId: "1098236220632",
  appId: "1:1098236220632:web:36c253749a03a66d10b3ad",
  measurementId: "G-C9QJ4T1QBB"
};
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);


  export {db, auth}