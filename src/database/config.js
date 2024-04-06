// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYB4ewNXpoI4YE0zcSXPVd6sv0n7LRb_g",
  authDomain: "vmcgowans-js4-final.firebaseapp.com",
  projectId: "vmcgowans-js4-final",
  storageBucket: "vmcgowans-js4-final.appspot.com",
  messagingSenderId: "1059359484698",
  appId: "1:1059359484698:web:dbc02d9cc96c5b61fc1aa3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);