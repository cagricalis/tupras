import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBItMCN9NQN313PH7BSRh3l6nQnwyN4GgA",
  authDomain: "tupras-b7e9f.firebaseapp.com",
  projectId: "tupras-b7e9f",
  storageBucket: "tupras-b7e9f.appspot.com",
  messagingSenderId: "187891353380",
  appId: "1:187891353380:web:62cf4223bf4e2cbb1015b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
const auth = getAuth(app);