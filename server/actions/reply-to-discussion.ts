"use server";

import { getOptimisticUser } from "@/lib/user";
import { actionClient } from "../action-client";
import { ReplyDiscussionSchema } from "@/schemas/ReplyDiscussionSchema";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";

export const replyToDiscussion = actionClient
  .schema(ReplyDiscussionSchema)
  .action(async ({ parsedInput }) => {
    const { content, courseId, discussionId, id } = parsedInput;
    const user = await getOptimisticUser();

    try {
      const replyRef = db.collection("discussionReplies").doc(id);
      const replyData = {
        id,
        content,
        courseId,
        discussionId,
        userId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await replyRef.set(replyData);

      const batch = db.batch();

      const discussionRepliesRef = db
        .collection("discussions")
        .doc(discussionId)
        .collection("discussionReplies")
        .doc(id);
      const replyDiscussionRef = db
        .collection("discussionReplies")
        .doc(id)
        .collection("discussion")
        .doc(discussionId);

      const reference = {
        discussionId,
        replyId: id,
        createdAt: new Date().toISOString(),
      };

      batch.set(discussionRepliesRef, replyData);
      batch.set(replyDiscussionRef, reference);

      await batch.commit();

      revalidateTag("discussions");
      revalidateTag("discussionReplies");

      return { success: "Replied to discussion successfully!" };
    } catch (error) {
      console.error("Error replying to discussion:", error);

      return { error };
    }
  });
