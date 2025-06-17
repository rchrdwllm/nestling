"use server";

import { ArchiveDiscussionSchema } from "@/schemas/ArchiveDiscussionSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { Discussion } from "@/types";
import { revalidateTag } from "next/cache";

export const archiveDiscussion = actionClient
  .schema(ArchiveDiscussionSchema)
  .action(async ({ parsedInput }) => {
    const { discussionId } = parsedInput;

    try {
      const discussionSnapshot = await db
        .collection("discussions")
        .doc(discussionId)
        .get();

      if (!discussionSnapshot.exists) {
        return { error: "Discussion not found" };
      }

      const discussionData = discussionSnapshot.data() as Discussion;
      const isArchived = discussionData.isArchived || false;

      await db
        .collection("discussions")
        .doc(discussionId)
        .update({
          isArchived: !isArchived,
          archivedAt: !isArchived ? new Date().toISOString() : null,
        });

      revalidateTag("discussions");

      return {
        success: `Discussion ${
          !isArchived ? "archived" : "unarchived"
        } successfully`,
      };
    } catch (error) {
      console.error("Error archiving discussion:", error);

      return { error };
    }
  });
