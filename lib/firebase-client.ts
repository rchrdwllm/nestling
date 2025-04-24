import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADMF6j2UaWNzDxaGPrAJF0NVnyp5J94pY",
  authDomain: "nestling-3eea1.firebaseapp.com",
  projectId: "nestling-3eea1",
  storageBucket: "nestling-3eea1.firebasestorage.app",
  messagingSenderId: "732687777835",
  appId: "1:732687777835:web:abffd11476fd3c15822a6e",
};

const app = initializeApp(firebaseConfig);

export const clientDb = getFirestore(app);
