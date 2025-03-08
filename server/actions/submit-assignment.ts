"use server";

import { db } from "@/lib/firebase";
import { actionClient } from "../action-client";
import { UploadFileSchema } from "@/schemas/UploadFileSchema";
import { getOptimisticUser } from "@/lib/user";
import { uploadFile } from "./upload-file";

export const submitAssignment = actionClient
  .schema(UploadFileSchema)
  .action(async ({ parsedInput }) => {
    const {
      asset_id,
      content_id,
      created_at,
      public_id,
      secure_url,
      type,
      url,
    } = parsedInput;
    const user = await getOptimisticUser();

    try {
      const batch = db.batch();

      const submissionId = crypto.randomUUID();
      const newSubmission = {
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

      const submissionRef = db.collection("submissions").doc(submissionId);

      const contentSubmissionRef = db
        .collection("contents")
        .doc(content_id!)
        .collection("submissions")
        .doc(submissionId);

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

        batch.set(submissionRef, newSubmission);
        batch.set(contentSubmissionRef, reference);

        await batch.commit();

        return { success: "Assignment submitted successfully" };
      } catch (error) {
        console.error("File upload failed:", error);

        return { error };
      }
    } catch (error) {
      console.error("Assignment submission failed:", error);

      return { error };
    }
  });
