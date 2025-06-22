"use server";

import { DeleteContentSchema } from "@/schemas/DeleteContentSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";
import { deleteFile } from "./delete-file";
import {
  deleteFileFromCloudinary,
  deleteImgFromCloudinary,
} from "./delete-from-cloudinary";
import { deleteImage } from "./delete-image";
import { Content, Submission } from "@/types";

export const deleteContent = actionClient
  .schema(DeleteContentSchema)
  .action(async ({ parsedInput }) => {
    const { contentId } = parsedInput;

    try {
      const contentRef = db.collection("contents").doc(contentId);
      const contentSnapshot = await contentRef.get();

      if (!contentSnapshot.exists) {
        return { error: "Content not found" };
      }

      const content = contentSnapshot.data() as Content;

      const batch = db.batch();

      const contentModuleRef = db
        .collection("contents")
        .doc(contentId)
        .collection("modules");
      const contentModuleSnapshot = await contentModuleRef.get();

      for (const moduleDoc of contentModuleSnapshot.docs) {
        const moduleRef = contentModuleRef.doc(moduleDoc.id);

        batch.delete(moduleRef);
      }

      const contentFilesRef = db
        .collection("contents")
        .doc(contentId)
        .collection("files");
      const contentFilesSnapshot = await contentFilesRef.get();

      for (const fileDoc of contentFilesSnapshot.docs) {
        const fileRef = contentFilesRef.doc(fileDoc.id);

        await deleteFile({ public_id: fileDoc.id });
        await deleteFileFromCloudinary(fileDoc.id);

        batch.delete(fileRef);
      }

      const contentImagesRef = db
        .collection("contents")
        .doc(contentId)
        .collection("images");
      const contentImagesSnapshot = await contentImagesRef.get();

      for (const imageDoc of contentImagesSnapshot.docs) {
        const imageRef = contentImagesRef.doc(imageDoc.id);

        await deleteImage({ public_id: imageDoc.id });
        await deleteImgFromCloudinary(imageDoc.id);

        batch.delete(imageRef);
      }

      const contentSubmissionsRef = db
        .collection("contents")
        .doc(contentId)
        .collection("submissions");
      const contentSubmissionsSnapshot = await contentSubmissionsRef.get();

      for (const submissionDoc of contentSubmissionsSnapshot.docs) {
        const contentSubmissionRef = contentSubmissionsRef.doc(
          submissionDoc.id
        );
        const submission = submissionDoc.data() as Submission;

        if (submission.fileId) {
          await deleteFile({ public_id: submission.fileId });
          await deleteFileFromCloudinary(submission.fileId);
        }

        const submissionRef = db
          .collection("submissions")
          .doc(submissionDoc.id);

        const submissionFilesRef = db
          .collection("submissions")
          .doc(submissionDoc.id)
          .collection("files");
        const submissionFilesSnapshot = await submissionFilesRef.get();

        for (const fileDoc of submissionFilesSnapshot.docs) {
          const fileRef = submissionFilesRef.doc(fileDoc.id);

          batch.delete(fileRef);
        }

        batch.delete(submissionRef);
        batch.delete(contentSubmissionRef);
      }

      const moduleContentsRef = db
        .collection("modules")
        .doc(content.moduleId)
        .collection("contents")
        .doc(contentId);

      batch.delete(moduleContentsRef);
      batch.delete(contentRef);

      await batch.commit();

      revalidateTag("contents");
      revalidateTag("assignments");
      revalidateTag("files");
      revalidateTag("images");
      revalidateTag("modules");

      return { success: "Content deleted successfully" };
    } catch (error) {
      console.error("Error deleting content:", error);
      return { error: JSON.stringify(error) };
    }
  });
