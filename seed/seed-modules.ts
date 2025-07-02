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

// Path to the modules.json file
const modulesFilePath = path.join(__dirname, "./modules.json");

// Function to clean module data by removing firestore_id field
function cleanModuleData(module: any) {
  const { firestore_id, ...cleanedModule } = module;
  return cleanedModule;
}

async function seedModules() {
  try {
    // Read and parse the modules JSON file
    const modulesData = JSON.parse(fs.readFileSync(modulesFilePath, "utf-8"));

    console.log(`Found ${modulesData.length} modules to upload...`);

    const modulesCollection = db.collection("modules");

    let successCount = 0;
    let errorCount = 0;

    for (const [index, module] of modulesData.entries()) {
      try {
        if (module.courseId !== "e23a04e4-fc8c-407a-b3d8-04fcc2ccf221") {
          return;
        }

        // First, upload the module document
        await modulesCollection.doc(module.id).set(module);
        console.log(
          `✅ ${index + 1}/${modulesData.length} - Module "${
            module.title
          }" uploaded successfully`
        );

        // Then create the subcollection "courses" with a specific document
        const coursesSubcollection = modulesCollection
          .doc(module.id)
          .collection("courses");

        const courseDocumentData = {
          courseId: "e23a04e4-fc8c-407a-b3d8-04fcc2ccf221",
          moduleId: module.id,
          createdAt: new Date().toISOString(),
        };

        await coursesSubcollection
          .doc("e23a04e4-fc8c-407a-b3d8-04fcc2ccf221")
          .set(courseDocumentData);
        console.log(
          `   📁 Created subcollection "courses" with course document for module "${module.title}"`
        );

        successCount++;
      } catch (error) {
        console.error(
          `❌ ${index + 1}/${modulesData.length} - Error uploading module "${
            module.title
          }":`,
          error
        );
        errorCount++;
      }
    }

    console.log(`\n📊 Upload Summary:`);
    console.log(`✅ Successful uploads: ${successCount}`);
    console.log(`❌ Failed uploads: ${errorCount}`);
    console.log(`📝 Total modules: ${modulesData.length}`);
    console.log(
      `📁 Each module has a "courses" subcollection with course document ID: e23a04e4-fc8c-407a-b3d8-04fcc2ccf221`
    );
  } catch (error) {
    console.error("❌ Error during modules upload:", error);

    if (error instanceof Error) {
      if (error.message.includes("ENOENT")) {
        console.error(
          "Make sure the modules.json file exists in the seed directory."
        );
      } else if (error.message.includes("service-account.json")) {
        console.error(
          "Make sure the service-account.json file exists in the seed directory."
        );
      }
    }
  }
}

// Alternative batch upload function (faster but less detailed error handling)
async function seedModulesBatch() {
  try {
    const modulesData = JSON.parse(fs.readFileSync(modulesFilePath, "utf-8"));

    console.log(
      `Found ${modulesData.length} modules to upload using batch method...`
    );

    const batch = db.batch();
    const modulesCollection = db.collection("modules");

    modulesData.forEach((module: any, index: number) => {
      if (module.courseId !== "e23a04e4-fc8c-407a-b3d8-04fcc2ccf221") {
        return;
      }

      // Add module document to batch
      const moduleDocRef = modulesCollection.doc(module.id);
      batch.set(moduleDocRef, module);

      // Add course document to subcollection in batch
      const courseDocRef = moduleDocRef
        .collection("courses")
        .doc("e23a04e4-fc8c-407a-b3d8-04fcc2ccf221");
      batch.set(courseDocRef, {
        courseId: "e23a04e4-fc8c-407a-b3d8-04fcc2ccf221",
      });

      console.log(
        `${index + 1}. Preparing module: ${module.title} (Module ${
          module.moduleNumber
        })`
      );
    });

    // Commit the batch
    await batch.commit();

    console.log(
      `\n✅ Successfully uploaded ${modulesData.length} modules to Firestore!`
    );
    console.log(
      "📁 Each module has been added to the 'modules' collection with a 'courses' subcollection."
    );
    console.log(
      "🔗 Each subcollection contains a course document with ID: e23a04e4-fc8c-407a-b3d8-04fcc2ccf221"
    );
  } catch (error) {
    console.error("❌ Error during batch modules upload:", error);
  }
}

async function addModulesToCourse() {
  try {
    const modulesData = JSON.parse(fs.readFileSync(modulesFilePath, "utf-8"));
    const courseId = "e23a04e4-fc8c-407a-b3d8-04fcc2ccf221";
    const courseDocRef = db.collection("courses").doc(courseId);
    const modulesSubcollection = courseDocRef.collection("modules");

    let successCount = 0;
    let errorCount = 0;

    for (const [index, module] of modulesData.entries()) {
      const moduleDocData = {
        moduleId: module.id,
        createdAt: new Date().toISOString(),
        courseId,
      };
      try {
        await modulesSubcollection.doc(module.id).set(moduleDocData);
        console.log(
          `✅ ${index + 1}/${modulesData.length} - Added module "${
            module.title
          }" to course "${courseId}"`
        );
        successCount++;
      } catch (error) {
        console.error(
          `❌ ${index + 1}/${modulesData.length} - Error adding module "${
            module.title
          }" to course:`,
          error
        );
        errorCount++;
      }
    }

    console.log(`\n📊 Course Modules Upload Summary:`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📝 Total modules processed: ${modulesData.length}`);
  } catch (error) {
    console.error("❌ Error adding modules to course:", error);
  }
}

// Check if we should use batch or individual upload
const args = process.argv.slice(2);
const useBatch = args.includes("--batch") || args.includes("-b");
const useAddToCourse = args.includes("--add-to-course") || args.includes("-a");

if (useBatch) {
  console.log("🔄 Using batch upload method...\n");
  seedModulesBatch().catch((error) => {
    console.error("Error during batch seeding:", error);
    process.exit(1);
  });
} else if (useAddToCourse) {
  console.log("🔄 Using add modules to course method...\n");
  addModulesToCourse().catch((error) => {
    console.error("Error during adding modules to course:", error);
    process.exit(1);
  });
} else {
  console.log("🔄 Using individual upload method for detailed progress...\n");
  seedModules().catch((error) => {
    console.error("Error during individual seeding:", error);
    process.exit(1);
  });
}
