"use server";

import { UploadImageSchema } from "@/schemas/UploadImageSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";

export const uploadImage = actionClient
  .schema(UploadImageSchema)
  .action(async ({ parsedInput }) => {
    const { url, asset_id, created_at, public_id, secure_url, content_id } =
      parsedInput;

    try {
      const imgRef = db.collection("images").doc(public_id);

      await imgRef.set({
        url,
        asset_id,
        created_at,
        public_id,
        secure_url,
        content_id,
      });

      const contentImgRef = db
        .collection("contents")
        .doc(content_id)
        .collection("images")
        .doc(public_id);

      const reference = {
        public_id,
        created_at,
        content_id,
        secure_url,
      };

      await contentImgRef.set(reference);

      return { success: `Image ${public_id} successfully` };
    } catch (error) {
      console.error("Image upload failed:", error);

      return { error };
    }
  });
