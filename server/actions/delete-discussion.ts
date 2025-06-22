"use server";

import { DeleteDiscussionSchema } from "@/schemas/DeleteDiscussionSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";
import { deleteImage } from "./delete-image";
import { deleteImgFromCloudinary } from "./delete-from-cloudinary";
import { deleteDiscussionReply } from "./delete-discussion-reply";

export const deleteDiscussion = actionClient
  .schema(DeleteDiscussionSchema)
  .action(async ({ parsedInput }) => {
    const { discussionId } = parsedInput;

    try {
      const batch = db.batch();
      const discussionRef = db.collection("discussions").doc(discussionId);
      const discussionSnapshot = await discussionRef.get();

      if (!discussionSnapshot.exists) {
        return { error: "Discussion not found" };
      }

      const discussionImagesRef = db
        .collection("discussions")
        .doc(discussionId)
        .collection("images");
      const discussionImagesSnapshot = await discussionImagesRef.get();

      for (const imageDoc of discussionImagesSnapshot.docs) {
        const imageRef = discussionImagesRef.doc(imageDoc.id);

        await deleteImage({ public_id: imageDoc.id });
        await deleteImgFromCloudinary(imageDoc.id);

        batch.delete(imageRef);
      }

      const discussionRepliesRef = db
        .collection("discussions")
        .doc(discussionId)
        .collection("discussionReplies");
      const discussionRepliesSnapshot = await discussionRepliesRef.get();

      for (const replyDoc of discussionRepliesSnapshot.docs) {
        const replyRef = discussionRepliesRef.doc(replyDoc.id);

        await deleteDiscussionReply({ replyId: replyDoc.id });

        batch.delete(replyRef);
      }

      batch.delete(discussionRef);

      await batch.commit();

      revalidateTag("discussions");

      return { success: "Discussion deleted successfully" };
    } catch (error) {
      console.error("Error deleting discussion:", error);

      return { error: JSON.stringify(error) };
    }
  });
