// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgZN8A11V-L1uKZYp8I6acdG5umy8vkRA",
  authDomain: "funny-father.firebaseapp.com",
  projectId: "funny-father",
  storageBucket: "funny-father.appspot.com",
  messagingSenderId: "425225953407",
  appId: "1:425225953407:web:443c8e5c67ebbff2689f4a",
  measurementId: "G-77NHGYNQTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);