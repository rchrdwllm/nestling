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

// Path to the courses.json file
const coursesFilePath = path.join(__dirname, "./courses.json");

async function seedCourses() {
  try {
    // Read and parse the courses JSON file
    const coursesData = JSON.parse(fs.readFileSync(coursesFilePath, "utf-8"));

    console.log(`Found ${coursesData.length} courses to upload...`);

    const coursesCollection = db.collection("courses");

    // Use batch for better performance
    const batch = db.batch();

    coursesData.forEach((course: any, index: number) => {
      const docRef = coursesCollection.doc(course.id);
      batch.set(docRef, course);
      console.log(
        `${index + 1}. Preparing course: ${course.name} (${course.courseCode})`
      );
    });

    // Commit the batch
    await batch.commit();

    console.log(
      `\n✅ Successfully uploaded ${coursesData.length} courses to Firestore!`
    );
    console.log("Courses have been added to the 'courses' collection.");
  } catch (error) {
    console.error("❌ Error during courses upload:", error);

    if (error instanceof Error) {
      if (error.message.includes("ENOENT")) {
        console.error(
          "Make sure the courses.json file exists in the project root."
        );
      } else if (error.message.includes("service-account.json")) {
        console.error(
          "Make sure the service-account.json file exists in the seed directory."
        );
      }
    }
  }
}

// Alternative function to upload courses one by one (slower but with individual error handling)
async function seedCoursesIndividually() {
  try {
    const coursesData = JSON.parse(fs.readFileSync(coursesFilePath, "utf-8"));

    console.log(`Found ${coursesData.length} courses to upload...`);

    const coursesCollection = db.collection("courses");
    let successCount = 0;
    let errorCount = 0;

    for (const [index, course] of coursesData.entries()) {
      try {
        await coursesCollection.doc(course.id).set(course);
        console.log(
          `✅ ${index + 1}/${coursesData.length} - Course "${course.name}" (${
            course.courseCode
          }) uploaded successfully`
        );
        successCount++;
      } catch (error) {
        console.error(
          `❌ ${index + 1}/${coursesData.length} - Error uploading course "${
            course.name
          }":`,
          error
        );
        errorCount++;
      }
    }

    console.log(`\n📊 Upload Summary:`);
    console.log(`✅ Successful uploads: ${successCount}`);
    console.log(`❌ Failed uploads: ${errorCount}`);
    console.log(`📝 Total courses: ${coursesData.length}`);
  } catch (error) {
    console.error("❌ Error during courses upload:", error);
  }
}

// Check if we should use batch or individual upload
const args = process.argv.slice(2);
const useIndividual = args.includes("--individual") || args.includes("-i");

if (useIndividual) {
  console.log("🔄 Using individual upload method...\n");
  seedCoursesIndividually().catch((error) => {
    console.error("Error during individual seeding:", error);
    process.exit(1);
  });
} else {
  console.log("🔄 Using batch upload method...\n");
  seedCourses().catch((error) => {
    console.error("Error during batch seeding:", error);
    process.exit(1);
  });
}
