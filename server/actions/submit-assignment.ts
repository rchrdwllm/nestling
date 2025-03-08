"use server";

import { db } from "@/lib/firebase";
import { actionClient } from "../action-client";
import { UploadFileSchema } from "@/schemas/UploadFileSchema";
import { getOptimisticUser } from "@/lib/user";
import { uploadFile } from "./upload-file";
import { SubmitAssignmentSchema } from "@/schemas/SubmitAssignmentSchema";
import * as z from "zod";

export const submitAssignment = actionClient
  .schema(SubmitAssignmentSchema)
  .schema(async (prevSchema) => {
    return prevSchema.extend({
      file: z.optional(UploadFileSchema),
    });
  })
  .action(async ({ parsedInput }) => {
    const { content, contentId, submissionType, file } = parsedInput;
    const user = await getOptimisticUser();

    try {
      const batch = db.batch();
      const submissionId = crypto.randomUUID();
      const submissionRef = db.collection("submissions").doc(submissionId);

      const contentSubmissionRef = db
        .collection("contents")
        .doc(contentId)
        .collection("submissions")
        .doc(submissionId);

      if (file) {
        const {
          asset_id,
          content_id,
          created_at,
          public_id,
          secure_url,
          type,
          url,
        } = file;

        const newFileSubmission = {
          userId: user.id,
          studentName: user.name,
          type,
          contentId: content_id,
          fileId: public_id,
          id: submissionId,
          createdAt: created_at,
          secureUrl: secure_url,
          isGraded: false,
          grade: null,
        };

        const reference = {
          submissionId,
          createdAt: created_at,
          fileId: public_id,
          secureUrl: secure_url,
          contentId: content_id,
          userId: user.id,
        };

        try {
          await uploadFile({
            asset_id,
            content_id,
            created_at,
            public_id,
            secure_url,
            type,
            url,
            submission_id: submissionId,
          });

          batch.set(submissionRef, newFileSubmission);
          batch.set(contentSubmissionRef, reference);

          await batch.commit();

          return { success: "Assignment submitted successfully" };
        } catch (error) {
          console.error("File upload failed:", error);

          return { error };
        }
      }

      const newSubmission = {
        userId: user.id,
        studentName: user.name,
        content,
        id: submissionId,
        contentId,
        createdAt: Date.now(),
        isGraded: false,
        grade: null,
      };

      batch.set(submissionRef, newSubmission);
      batch.set(contentSubmissionRef, {
        submissionId,
        createdAt: newSubmission.createdAt,
        contentId,
        userId: user.id,
      });

      await batch.commit();

      return { success: "Assignment submitted successfully" };
    } catch (error) {
      console.error("Assignment submission failed:", error);

      return { error };
    }
  });
