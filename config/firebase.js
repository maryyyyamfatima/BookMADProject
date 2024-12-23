import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Realtime Database
import { getAuth } from "firebase/auth"; // Firebase Authentication

// Your web app's Firebase configuration
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

// Initialize Firebase services
const database = getDatabase(app);
const auth = getAuth(app); // Firebase Authentication

export { app, database, auth };
