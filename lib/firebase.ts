import { initFirestore } from "@auth/firebase-adapter";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyADMF6j2UaWNzDxaGPrAJF0NVnyp5J94pY",
  authDomain: "nestling-3eea1.firebaseapp.com",
  projectId: "nestling-3eea1",
  storageBucket: "nestling-3eea1.firebasestorage.app",
  messagingSenderId: "732687777835",
  appId: "1:732687777835:web:abffd11476fd3c15822a6e",
};

export const firebase = initializeApp(firebaseConfig);
export const db = initFirestore();
