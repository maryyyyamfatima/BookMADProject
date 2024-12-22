// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Realtime Database

//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2m9ovl120-_SGfO4LJ9U1Fpq5r8xot1w",
  authDomain: "book-store-4c645.firebaseapp.com",
  projectId: "book-store-4c645",
  storageBucket: "book-store-4c645.firebasestorage.app",
  messagingSenderId: "520073488466",
  appId: "1:520073488466:web:671323a5e5895718e3978b",
  measurementId: "G-L4VD0GL42H",
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database = getDatabase(app);

// Export the Firebase app and database
export { app, getDatabase };
