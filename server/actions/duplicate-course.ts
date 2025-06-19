"use server";

import { DuplicateCourseSchema } from "@/schemas/DuplicateCourseSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { Course, File, Image } from "@/types";
import {
  getCourseImage,
  getCourseInstructors,
  getEnrolledStudentIds,
} from "@/lib/course";
import { getCourseModules } from "@/lib/module";
import { getModuleContents } from "@/lib/content";
import { duplicateCloudinaryFile, duplicateCloudinaryImage } from "@/lib/utils";
import { revalidateTag } from "next/cache";

export const duplicateCourse = actionClient
  .schema(DuplicateCourseSchema)
  .action(async ({ parsedInput }) => {
    const { courseId } = parsedInput;

    try {
      const courseCollection = db.collection("courses");
      const courseSnapshot = await db.collection("courses").doc(courseId).get();

      if (!courseSnapshot.exists) {
        return { error: "Course not found" };
      }

      const courseData = courseSnapshot.data() as Course;
      const newId = crypto.randomUUID();
      const batch = db.batch();

      const { success: image, error: imageError } = await getCourseImage(
        courseId
      );

      if (imageError || !image) {
        console.error("Failed to get course image:", imageError);

        return { error: imageError };
      }

      const { success: newCloudinaryImage, error: uploadError } =
        await duplicateCloudinaryImage(image.secure_url, image.public_id);

      if (uploadError || !newCloudinaryImage) {
        console.error("Failed to duplicate image:", uploadError);

        return { error: uploadError };
      }

      const newImageId = crypto.randomUUID();

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
        // hash: newCloudinaryImage.hash,
      };

      batch.set(newImageRef, {
        ...imageData,
        id: newImageId,
        url: newCloudinaryImage.secure_url,
        public_id: newCloudinaryImage.public_id,
      });
      batch.set(contentImageRef, reference);

      batch.set(courseCollection.doc(newId), {
        ...courseData,
        id: newId,
      });

      const { success: courseModules, error: courseModulesError } =
        await getCourseModules(courseId);

      if (courseModulesError || !courseModules) {
        return { error: courseModulesError };
      }

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

        batch.set(moduleRef, {
          ...module,
          id: newModuleId,
          courseId: newId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        batch.set(courseModuleRef, reference);
        batch.set(moduleCourseRef, reference);

        const { success: moduleContents, error: moduleContentsError } =
          await getModuleContents(module.id);

        if (moduleContentsError || !moduleContents) {
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

          batch.set(contentRef, {
            ...content,
            id: newContentId,
            moduleId: newModuleId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          batch.set(contentModuleRef, reference);
          batch.set(moduleContentRef, reference);

          const contentFilesRef = await db
            .collection("contents")
            .doc(content.id)
            .collection("files")
            .get();
          if (!contentFilesRef.empty) {
            for (const fileDoc of contentFilesRef.docs) {
              const fileData = fileDoc.data() as File;
              const newFileId = crypto.randomUUID();

              const { success: newCloudinaryFile, error: uploadError } =
                await duplicateCloudinaryFile(
                  fileData.secure_url,
                  fileData.original_filename
                );

              if (uploadError || !newCloudinaryFile) {
                console.error("Failed to duplicate file:", uploadError);

                continue;
              }

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

              batch.set(newFileRef, {
                ...fileData,
                id: newFileId,
                url: newCloudinaryFile.secure_url,
                publicId: newCloudinaryFile.public_id,
              });
              batch.set(contentFileRef, reference);
            }
          }

          const contentImagesRef = await db
            .collection("contents")
            .doc(content.id)
            .collection("images")
            .get();
          if (!contentImagesRef.empty) {
            for (const imageDoc of contentImagesRef.docs) {
              const imageData = imageDoc.data() as Image;
              const newImageId = crypto.randomUUID();

              const { success: newCloudinaryImage, error: uploadError } =
                await duplicateCloudinaryImage(
                  imageData.secure_url,
                  imageData.public_id
                );

              if (uploadError || !newCloudinaryImage) {
                console.error("Failed to duplicate image:", uploadError);

                continue;
              }

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

        await batch.commit();

        revalidateTag("courses");
        revalidateTag("modules");
        revalidateTag("contents");
        revalidateTag("files");
        revalidateTag("images");

        return { success: `Course ${courseData.name} duplicated successfully` };
      }
    } catch (error) {
      console.error("Error duplicating course:", error);

      return { error };
    }
  });
