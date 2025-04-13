import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin SDK using service-key.json
const serviceAccountPath = path.join(__dirname, "../service-key.json");
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

  for (const user of usersData) {
    try {
      await usersCollection.doc(user.id).set(user);
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
