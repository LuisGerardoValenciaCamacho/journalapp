// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8KSVjdqWrn-WbZ3Wgfq4--5QHuenbZKA",
  authDomain: "journalapp-89882.firebaseapp.com",
  projectId: "journalapp-89882",
  storageBucket: "journalapp-89882.appspot.com",
  messagingSenderId: "508790950057",
  appId: "1:508790950057:web:e5ccf57d544eea5179c1b8"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);