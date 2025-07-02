import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin SDK using service-account.json
const serviceAccountPath = path.join(__dirname, "../service-account.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// Helper function to delete all documents in a collection
const deleteCollection = async (collectionRef: any, batchSize = 100) => {
  const query = collectionRef.limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, resolve, reject);
  });
};

const deleteQueryBatch = async (query: any, resolve: any, reject: any) => {
  try {
    const snapshot = await query.get();

    if (snapshot.size === 0) {
      resolve(null);
      return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc: any) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    // Recurse on the next batch
    process.nextTick(() => {
      deleteQueryBatch(query, resolve, reject);
    });
  } catch (error) {
    reject(error);
  }
};

// Helper function to delete subcollections of a document
const deleteSubcollections = async (
  docRef: any,
  subcollectionNames: string[]
) => {
  for (const subcollectionName of subcollectionNames) {
    const subcollectionRef = docRef.collection(subcollectionName);
    await deleteCollection(subcollectionRef);
  }
};

const cleanDb = async () => {
  try {
    const extraCoursesSnapshot = await db
      .collection("courses")
      .where("id", "!=", "39860f2f-e5ee-43ef-8a70-7824820832b6")
      .get();

    // Delete subcollections for each course before deleting the course
    for (const doc of extraCoursesSnapshot.docs) {
      // Add the names of subcollections that exist under courses
      await deleteSubcollections(doc.ref, [
        "enrolledStudents",
        "modules",
        "contents",
        "instructors",
        "images",
      ]);
    }

    const batch = db.batch();

    extraCoursesSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    const extraModules = await db
      .collection("modules")
      .where("courseId", "!=", "39860f2f-e5ee-43ef-8a70-7824820832b6")
      .get();

    // Delete subcollections for each module
    for (const doc of extraModules.docs) {
      await deleteSubcollections(doc.ref, ["courses", "contents"]);
    }

    extraModules.forEach((doc) => {
      batch.delete(doc.ref);
    });

    const extraContents = await db
      .collection("contents")
      .where("courseId", "!=", "39860f2f-e5ee-43ef-8a70-7824820832b6")
      .get();

    // Delete subcollections for each content
    for (const doc of extraContents.docs) {
      await deleteSubcollections(doc.ref, ["modules", "courses"]);
    }

    extraContents.forEach((doc) => {
      batch.delete(doc.ref);
    });

    const allAnnouncements = await db
      .collection("announcements")
      .where("courseId", "==", "39860f2f-e5ee-43ef-8a70-7824820832b6")
      .get();

    // Delete subcollections for each announcement
    for (const doc of allAnnouncements.docs) {
      await deleteSubcollections(doc.ref, []);
    }

    const allDiscussions = await db
      .collection("discussions")
      .where("courseId", "==", "39860f2f-e5ee-43ef-8a70-7824820832b6")
      .get();

    // Delete subcollections for each discussion
    for (const doc of allDiscussions.docs) {
      await deleteSubcollections(doc.ref, []);
    }

    allAnnouncements.forEach((doc) => {
      batch.delete(doc.ref);
    });

    allDiscussions.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    console.log("Successfully cleaned course management data");
  } catch (error) {
    console.error("Error cleaning db: " + error);
  }
};

cleanDb();
