import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBlbGFfhd-g4zpp1YpXlH10iHQAG1RDK0c",
  authDomain: "nestling-backup.firebaseapp.com",
  projectId: "nestling-backup",
  storageBucket: "nestling-backup.firebasestorage.app",
  messagingSenderId: "344308890060",
  appId: "1:344308890060:web:085458698f2f2b35330569",
};

export const firebase = initializeApp(firebaseConfig);
export const db = initFirestore({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});
