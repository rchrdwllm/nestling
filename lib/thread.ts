"use server";

import { Thread } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";

export const getThreadByChannelId = async (channelId: string) => {
  try {
    const threadSnapshot = await db
      .collection("threads")
      .where("channelId", "==", channelId)
      .get();

    if (threadSnapshot.empty) {
      return { error: "Thread not found" };
    }

    const threadData = threadSnapshot.docs[0].data() as Thread;

    return { success: threadData };
  } catch (error) {
    console.error("Error fetching thread by channel ID:", error);

    return { error };
  }
};

export const getUserThreads = unstable_cache(
  async (userId: string) => {
    try {
      const threadsSnapshot = await db
        .collection("threads")
        .where("userIds", "array-contains", userId)
        .orderBy("updatedAt", "desc")
        .get();

      if (threadsSnapshot.empty) {
        return { success: [] };
      }

      const threads = threadsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        };
      }) as Thread[];

      return { success: threads };
    } catch (error) {
      console.error("Error fetching user threads:", error);

      return { error };
    }
  },
  ["userId"]
);
