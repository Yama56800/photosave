// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);

// Exporte les instances pour l'authentification, le stockage et Firestore
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app); // Initialise et exporte Firestore

// Enregistrer des instances globales peut être utile pour le débogage, mais fais attention à la sécurité et à la propreté de ton code.
// window.firebase = app; // Optionnel, pour le débogage
// window.auth = auth; // Optionnel, pour le débogage
