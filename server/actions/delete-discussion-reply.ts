"use server";

import { DeleteDiscussionReplySchema } from "@/schemas/DeleteDiscussionReplySchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";
import { DiscussionReply } from "@/types";
import { deleteImage } from "./delete-image";
import { deleteImgFromCloudinary } from "./delete-from-cloudinary";

export const deleteDiscussionReply = actionClient
  .schema(DeleteDiscussionReplySchema)
  .action(async ({ parsedInput }) => {
    const { replyId } = parsedInput;

    try {
      const batch = db.batch();
      const replyRef = db.collection("discussionReplies").doc(replyId);
      const replySnapshot = await replyRef.get();

      if (!replySnapshot.exists) {
        return { error: "Reply not found" };
      }

      const replyData = replySnapshot.data() as DiscussionReply;
      const replyDiscussionRef = db
        .collection("discussionReplies")
        .doc(replyId)
        .collection("discussion")
        .doc(replyData.discussionId);

      batch.delete(replyDiscussionRef);

      const replyImagesRef = db
        .collection("discussionReplies")
        .doc(replyId)
        .collection("images");
      const replyImagesSnapshot = await replyImagesRef.get();

      for (const imageDoc of replyImagesSnapshot.docs) {
        const imageRef = replyImagesRef.doc(imageDoc.id);

        await deleteImage({ public_id: imageDoc.id });
        await deleteImgFromCloudinary(imageDoc.id);

        batch.delete(imageRef);
      }

      batch.delete(replyRef);

      await batch.commit();

      revalidateTag("discussionReplies");

      return { success: "Reply deleted successfully" };
    } catch (error) {
      console.error("Error deleting discussion reply:", error);

      return { error: JSON.stringify(error) };
    }
  });
