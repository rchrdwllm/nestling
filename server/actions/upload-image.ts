"use server";

import { UploadImageSchema } from "@/schemas/UploadImageSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { getOptimisticUser } from "@/lib/user";

export const uploadImage = actionClient
  .schema(UploadImageSchema)
  .action(async ({ parsedInput }) => {
    const {
      url,
      asset_id,
      created_at,
      public_id,
      secure_url,
      content_id,
      course_id,
    } = parsedInput;
    const user = await getOptimisticUser();

    try {
      const imgRef = db.collection("images").doc(public_id);

      await imgRef.set({
        url,
        asset_id,
        created_at,
        public_id,
        secure_url,
        user_id: user.id,
      });

      if (content_id) {
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
      }

      if (course_id) {
        const courseImgRef = db
          .collection("courses")
          .doc(course_id)
          .collection("images")
          .doc(public_id);

        const reference = {
          public_id,
          created_at,
          course_id,
          secure_url,
        };

        await courseImgRef.set(reference);
      }

      return { success: { url, asset_id, created_at, public_id, secure_url } };
    } catch (error) {
      console.error("Image upload failed:", error);

      return { error };
    }
  });
