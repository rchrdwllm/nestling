"use server";

import { UploadFileSchema } from "@/schemas/UploadFileSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { getOptimisticUser } from "@/lib/user";

export const uploadFile = actionClient
  .schema(UploadFileSchema)
  .action(async ({ parsedInput }) => {
    const {
      url,
      asset_id,
      created_at,
      public_id,
      secure_url,
      content_id,
      type,
      submission_id,
    } = parsedInput;
    const user = await getOptimisticUser();

    try {
      const fileRef = db.collection("files").doc(public_id);
      const newFile = {
        url,
        asset_id,
        created_at,
        public_id,
        secure_url,
        content_id,
        type,
        user_id: user.id,
      };

      await fileRef.set(newFile);

      if (content_id) {
        const contentFileRef = db
          .collection("contents")
          .doc(content_id)
          .collection("files")
          .doc(public_id);

        const reference = {
          public_id,
          created_at,
          content_id,
          secure_url,
        };

        await contentFileRef.set(reference);
      }

      if (submission_id) {
        const submissionFileRef = db
          .collection("submissions")
          .doc(submission_id)
          .collection("files")
          .doc(public_id);

        const reference = {
          public_id,
          created_at,
          submission_id,
          secure_url,
        };

        await submissionFileRef.set(reference);
      }

      return { success: newFile };
    } catch (error) {
      console.error("File upload failed:", error);

      return { error };
    }
  });
