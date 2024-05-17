import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-authetication-580d2.firebaseapp.com",
  projectId: "mern-authetication-580d2",
  storageBucket: "mern-authetication-580d2.appspot.com",
  messagingSenderId: "52084950575",
  appId: "1:52084950575:web:d56e3438d7960a6d7268da",
  measurementId: "G-YVJPQ3323R",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

