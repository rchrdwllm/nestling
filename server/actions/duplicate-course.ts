"use server";

import { DuplicateCourseSchema } from "@/schemas/DuplicateCourseSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { Course, File, Image } from "@/types";
import { getCourseImage } from "@/lib/course";
import { getCourseModules } from "@/lib/module";
import { getModuleContents } from "@/lib/content";
import { duplicateCloudinaryFile, duplicateCloudinaryImage } from "@/lib/utils";
import { revalidateTag } from "next/cache";

export const duplicateCourse = actionClient
  .schema(DuplicateCourseSchema)
  .action(async ({ parsedInput }) => {
    const { courseId } = parsedInput;

    try {
      console.log("Duplicating course with ID:", courseId);

      const courseCollection = db.collection("courses");
      const courseSnapshot = await db.collection("courses").doc(courseId).get();

      if (!courseSnapshot.exists) {
        console.log("Course not found:", courseId);

        return { error: "Course not found" };
      }

      const courseData = courseSnapshot.data() as Course;
      const newId = crypto.randomUUID();
      const batch = db.batch();

      console.log("First, duplicating course image...");
      console.log("Getting course image...");

      const { success: image, error: imageError } = await getCourseImage(
        courseId
      );

      if (imageError || !image) {
        console.log("Failed to get course image:", imageError);

        return { error: imageError };
      }

      console.log("Duplicating course image with new hash...");

      const {
        success: newCloudinaryImage,
        hash,
        error: uploadError,
      } = await duplicateCloudinaryImage(image.secure_url, image.public_id);

      if (uploadError || !newCloudinaryImage) {
        console.log("Failed to duplicate image:", uploadError);

        return { error: uploadError };
      }

      const newImageId = crypto.randomUUID();

      console.log("Creating new image reference...");

      const newImageRef = db.collection("images").doc(newImageId);
      const courseImgRef = db
        .collection("courses")
        .doc(newId)
        .collection("images")
        .doc(newImageId);

      const reference = {
        public_id: newImageId,
        created_at: new Date().toISOString(),
        course_id: newId,
        secure_url: newCloudinaryImage.secure_url,
        hash: hash || "",
      };

      console.log("Setting new image data in batch...");

      batch.set(newImageRef, {
        ...image,
        id: newImageId,
        url: newCloudinaryImage.secure_url,
        public_id: newCloudinaryImage.public_id,
        hash: hash || "",
      });

      console.log("Setting course image reference in batch...");

      batch.set(courseImgRef, reference);

      console.log("Setting main course data in batch...");

      batch.set(courseCollection.doc(newId), {
        ...courseData,
        id: newId,
      });

      console.log("Getting course modules...");

      const { success: courseModules, error: courseModulesError } =
        await getCourseModules(courseId);

      if (courseModulesError || !courseModules) {
        console.log("Failed to get course modules:", courseModulesError);

        return { error: courseModulesError };
      }

      console.log("Duplicating course modules...");

      for (const module of courseModules) {
        const newModuleId = crypto.randomUUID();
        const moduleRef = db.collection("modules").doc(newModuleId);
        const courseModuleRef = db
          .collection("courses")
          .doc(newId)
          .collection("modules")
          .doc(newModuleId);
        const moduleCourseRef = db
          .collection("modules")
          .doc(newModuleId)
          .collection("courses")
          .doc(newId);
        const reference = {
          moduleId: newModuleId,
          courseId: newId,
          createdAt: new Date().toISOString(),
        };

        console.log("Creating new module reference...");

        console.log("Setting new module data in batch...");

        batch.set(moduleRef, {
          ...module,
          id: newModuleId,
          courseId: newId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        batch.set(courseModuleRef, reference);
        batch.set(moduleCourseRef, reference);

        console.log("Getting module contents...");

        const { success: moduleContents, error: moduleContentsError } =
          await getModuleContents(module.id);

        if (moduleContentsError || !moduleContents) {
          console.log("Failed to get module contents:", moduleContentsError);

          return { error: moduleContentsError };
        }

        for (const content of moduleContents) {
          const newContentId = crypto.randomUUID();
          const contentRef = db.collection("contents").doc(newContentId);
          const contentModuleRef = db
            .collection("contents")
            .doc(newContentId)
            .collection("modules")
            .doc(newModuleId);
          const moduleContentRef = db
            .collection("modules")
            .doc(newModuleId)
            .collection("contents")
            .doc(newContentId);
          const reference = {
            contentId: newContentId,
            moduleId: newModuleId,
            createdAt: new Date().toISOString(),
          };

          console.log("Creating new content reference...");

          console.log("Setting new content data in batch...");

          batch.set(contentRef, {
            ...content,
            id: newContentId,
            moduleId: newModuleId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          batch.set(contentModuleRef, reference);
          batch.set(moduleContentRef, reference);

          console.log("Duplicating content files...");

          const contentFilesRef = await db
            .collection("contents")
            .doc(content.id)
            .collection("files")
            .get();

          if (!contentFilesRef.empty) {
            for (const fileDoc of contentFilesRef.docs) {
              const fileData = fileDoc.data() as File;
              const newFileId = crypto.randomUUID();

              console.log("Duplicating file:", fileData.original_filename);

              const { success: newCloudinaryFile, error: uploadError } =
                await duplicateCloudinaryFile(
                  fileData.secure_url,
                  fileData.original_filename
                );

              if (uploadError || !newCloudinaryFile) {
                console.error("Failed to duplicate file:", uploadError);

                continue;
              }

              console.log("Creating new file reference...");

              const newFileRef = db.collection("files").doc(newFileId);
              const contentFileRef = db
                .collection("contents")
                .doc(newContentId)
                .collection("files")
                .doc(newFileId);
              const reference = {
                fileId: newFileId,
                contentId: newContentId,
                createdAt: new Date().toISOString(),
              };

              console.log("Setting new file data in batch...");

              batch.set(newFileRef, {
                ...fileData,
                id: newFileId,
                url: newCloudinaryFile.secure_url,
                publicId: newCloudinaryFile.public_id,
              });
              batch.set(contentFileRef, reference);
            }
          }

          console.log("Duplicating content images...");

          const contentImagesRef = await db
            .collection("contents")
            .doc(content.id)
            .collection("images")
            .get();
          if (!contentImagesRef.empty) {
            for (const imageDoc of contentImagesRef.docs) {
              const imageData = imageDoc.data() as Image;
              const newImageId = crypto.randomUUID();

              console.log("Duplicating image");

              const { success: newCloudinaryImage, error: uploadError } =
                await duplicateCloudinaryImage(
                  imageData.secure_url,
                  imageData.public_id
                );

              if (uploadError || !newCloudinaryImage) {
                console.log("Failed to duplicate image:", uploadError);

                continue;
              }

              console.log("Creating new image reference...");

              console.log("Setting new image data in batch...");

              const newImageRef = db.collection("images").doc(newImageId);
              const contentImageRef = db
                .collection("contents")
                .doc(newContentId)
                .collection("images")
                .doc(newImageId);
              const reference = {
                imageId: newImageId,
                contentId: newContentId,
                createdAt: new Date().toISOString(),
              };

              batch.set(newImageRef, {
                ...imageData,
                id: newImageId,
                url: newCloudinaryImage.secure_url,
                public_id: newCloudinaryImage.public_id,
              });
              batch.set(contentImageRef, reference);
            }
          }
        }
      }

      console.log("Committing module batch...");

      await batch.commit();

      console.log("Revalidating tags...");

      revalidateTag("courses");
      revalidateTag("modules");
      revalidateTag("contents");
      revalidateTag("files");
      revalidateTag("images");

      return { success: `Course ${courseData.name} duplicated successfully` };
    } catch (error) {
      console.error("Error duplicating course:", error);

      return { error };
    }
  });
