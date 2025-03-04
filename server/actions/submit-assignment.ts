"use server";

import { db } from "@/lib/firebase";
import { actionClient } from "../action-client";
import { UploadFileSchema } from "@/schemas/UploadFileSchema";
import { getOptimisticUser } from "@/lib/user";

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
      const submissionId = crypto.randomUUID();

      const newFile = {
        url,
        asset_id,
        created_at,
        public_id,
        secure_url,
        content_id,
        type,
        user_id: user.id,
        submission_id: submissionId,
      };

      const batch = db.batch();

      const fileRef = db.collection("files").doc(public_id);

      const newSubmission = {
        userId: user.id,
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
        .doc(content_id)
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

      batch.set(fileRef, newFile);
      batch.set(submissionRef, newSubmission);
      batch.set(contentSubmissionRef, reference);

      await batch.commit();

      return { success: "Assignment submitted successfully" };
    } catch (error) {
      console.error("Assignment submission failed:", error);

      return { error };
    }
  });
