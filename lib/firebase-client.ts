import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlbGFfhd-g4zpp1YpXlH10iHQAG1RDK0c",
  authDomain: "nestling-backup.firebaseapp.com",
  projectId: "nestling-backup",
  storageBucket: "nestling-backup.firebasestorage.app",
  messagingSenderId: "344308890060",
  appId: "1:344308890060:web:085458698f2f2b35330569",
};

const app = initializeApp(firebaseConfig);

export const clientDb = getFirestore(app);
