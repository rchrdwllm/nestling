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

// Path to the contents.json file
const contentsFilePath = path.join(__dirname, "./contents.json");

async function seedContents() {
  try {
    // Read and parse the contents JSON file
    const contentsData = JSON.parse(fs.readFileSync(contentsFilePath, "utf-8"));

    console.log(`Found ${contentsData.length} content items to upload...`);

    let successCount = 0;
    let errorCount = 0;

    for (const [index, content] of contentsData.entries()) {
      try {
        // Each content goes into the top-level 'contents' collection
        if (!content.id) {
          throw new Error("Missing id for content item");
        }
        const contentRef = db.collection("contents").doc(content.id);
        await contentRef.set(content);
        console.log(
          `✅ ${index + 1}/${contentsData.length} - Content '${
            content.title
          }' uploaded to contents collection`
        );

        await db
          .collection("modules")
          .doc(content.moduleId)
          .collection("contents")
          .doc(content.id)
          .set({
            contentId: content.id,
            createdAt: new Date().toISOString(),
            moduleId: content.moduleId,
          });

        successCount++;
      } catch (error) {
        console.error(
          `❌ ${index + 1}/${contentsData.length} - Error uploading content '${
            content.title
          }':`,
          error
        );
        errorCount++;
      }
    }

    console.log(`\n📊 Upload Summary:`);
    console.log(`✅ Successful uploads: ${successCount}`);
    console.log(`❌ Failed uploads: ${errorCount}`);
    console.log(`📝 Total content items: ${contentsData.length}`);
  } catch (error) {
    console.error("❌ Error during contents upload:", error);

    if (error instanceof Error) {
      if (error.message.includes("ENOENT")) {
        console.error(
          "Make sure the contents.json file exists in the seed directory."
        );
      } else if (error.message.includes("service-account.json")) {
        console.error(
          "Make sure the service-account.json file exists in the seed directory."
        );
      }
    }
  }
}

seedContents().catch((error) => {
  console.error("Error during seeding:", error);
  process.exit(1);
});
