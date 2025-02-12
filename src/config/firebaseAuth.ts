import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCrdxoVEG0ohfCsqnxYGIUl5LTPwm0tkaI",
  authDomain: "chatterbox-c9a5b.firebaseapp.com",
  projectId: "chatterbox-c9a5b",
  storageBucket: "chatterbox-c9a5b.firebasestorage.app",
  messagingSenderId: "546082772105",
  appId: "1:546082772105:web:710cc770b5c4149a662258",
  measurementId: "G-PY4T5Y0BE7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {
  auth,
  firestore
};