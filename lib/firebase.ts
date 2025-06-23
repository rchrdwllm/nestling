import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyADMF6j2UaWNzDxaGPrAJF0NVnyp5J94pY",
  authDomain: "nestling-3eea1.firebaseapp.com",
  projectId: "nestling-3eea1",
  storageBucket: "nestling-3eea1.firebasestorage.app",
  messagingSenderId: "732687777835",
  appId: "1:732687777835:web:abffd11476fd3c15822a6e",
  measurementId: "G-Y3DJGQMQB5",
};

export const firebase = initializeApp(firebaseConfig);
export const db = initFirestore({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});
