"use server";

import { db } from "./firebase";

const EXCLUDED_COLLECTIONS = ["subscriptions", "passwordResetTokens"];

export const backupFirestore = async () => {
  try {
    const backup: { [key: string]: any } = {};
    let collections = await db.listCollections();
    collections = collections.filter(
      (collection) => !EXCLUDED_COLLECTIONS.includes(collection.id)
    );
    console.log(`Found ${collections.length} collections`);

    for (const collection of collections) {
      const collectionId = collection.id;
      console.log(`Backing up collection: ${collectionId}`);
      backup[collectionId] = {};
      const docs = await collection.get();
      console.log(
        `  Found ${docs.docs.length} documents in collection ${collectionId}`
      );
      for (const doc of docs.docs) {
        console.log(`    Backing up document: ${doc.id}`);
        backup[collectionId][doc.id] = doc.data();
        const subcollections = await doc.ref.listCollections();
        console.log(
          `      Found ${subcollections.length} subcollections in document ${doc.id}`
        );
        for (const subcollection of subcollections) {
          const subcollectionId = subcollection.id;
          console.log(`        Backing up subcollection: ${subcollectionId}`);
          if (!backup[collectionId][doc.id]["subcollections"]) {
            backup[collectionId][doc.id]["subcollections"] = {};
          }
          backup[collectionId][doc.id]["subcollections"][subcollectionId] = {};
          const subdocs = await subcollection.get();
          console.log(
            `          Found ${subdocs.docs.length} documents in subcollection ${subcollectionId}`
          );
          for (const subdoc of subdocs.docs) {
            console.log(`            Backing up subdocument: ${subdoc.id}`);
            backup[collectionId][doc.id]["subcollections"][subcollectionId][
              subdoc.id
            ] = subdoc.data();
          }
        }
      }
    }

    return { success: JSON.stringify(backup, null, 2) };
  } catch (error) {
    console.error("Error backing up Firestore:", error);

    return { error };
  }
};
