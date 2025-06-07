"use server";

import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { DiscussionReply } from "@/types";

export const getDiscussionReplies = unstable_cache(
  async (discussionId: string) => {
    try {
      const repliesSnapshot = await db
        .collection("discussionReplies")
        .where("discussionId", "==", discussionId)
        .orderBy("createdAt", "desc")
        .get();

      const replies = repliesSnapshot.docs.map((doc) =>
        doc.data()
      ) as DiscussionReply[];

      return { success: replies };
    } catch (error) {
      console.error("Error fetching discussion replies:", error);

      return { error };
    }
  },
  ["discussionId"],
  { revalidate: 60 * 60, tags: ["discussionReplies"] }
);
