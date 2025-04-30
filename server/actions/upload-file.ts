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
      message_id,
      type,
      submission_id,
      resource_type,
      hash,
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
        type,
        user_id: user.id,
        resource_type,
        hash,
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
          hash,
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
          hash,
        };

        await submissionFileRef.set(reference);
      }

      if (message_id) {
        const messageFileRef = db
          .collection("messages")
          .doc(message_id)
          .collection("files")
          .doc(public_id);

        const reference = {
          public_id,
          created_at,
          message_id,
          secure_url,
          hash,
        };

        await messageFileRef.set(reference);
      }

      return { success: newFile };
    } catch (error) {
      console.error("File upload failed:", error);

      return { error };
    }
  });
