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
      discussion_id,
      reply_id,
      hash,
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
        hash,
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
          hash,
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
          hash,
        };

        await courseImgRef.set(reference);
      }

      if (discussion_id) {
        const discussionImgRef = db
          .collection("discussions")
          .doc(discussion_id)
          .collection("images")
          .doc(public_id);
        const reference = {
          public_id,
          created_at,
          discussion_id,
          secure_url,
          hash,
        };

        await discussionImgRef.set(reference);
      }

      if (reply_id) {
        const replyImgRef = db
          .collection("discussionReplies")
          .doc(reply_id)
          .collection("images")
          .doc(public_id);
        const reference = {
          public_id,
          created_at,
          reply_id,
          secure_url,
          hash,
        };

        await replyImgRef.set(reference);
      }

      return {
        success: { url, asset_id, created_at, public_id, secure_url, hash },
      };
    } catch (error) {
      console.error("Image upload failed:", error);

      return { error };
    }
  });
