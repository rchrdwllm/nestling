import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import CryptoJS from "crypto-js";

export const encryptData = (data: string, key: string): string => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify({ data }),
    key
  ).toString();

  return encrypted;
};

export const decryptData = (encryptedData: string, key: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key).toString(
    CryptoJS.enc.Utf8
  );
  const { data } = JSON.parse(bytes);
  const decrypted = data || "";

  if (!decrypted) {
    throw new Error("Decryption failed or data is empty");
  }

  return decrypted;
};

// Resolve __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin SDK using service-key.json
const serviceAccountPath = path.join(__dirname, "../service-account.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// Path to the users.json file
const usersFilePath = path.join(__dirname, "users.json");

// Read and parse the JSON file
const usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

async function seedUsers() {
  const usersCollection = db.collection("users");
  const aesKey =
    "5649f16597220c4b94480fb6248f3fb0d298ad0332d1bee7f9355e4bee33f3c0";

  for (const user of usersData) {
    try {
      await usersCollection.doc(user.id).set({
        ...user,
        address: encryptData(user.address, aesKey),
        contactNumber: encryptData(user.contactNumber, aesKey),
      });
      console.log(`User with ID ${user.id} added successfully.`);
    } catch (error) {
      console.error(`Error adding user with ID ${user.id}:`, error);
    }
  }

  console.log("Seeding completed.");
}

seedUsers().catch((error) => {
  console.error("Error during seeding:", error);
});
