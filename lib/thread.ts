"use server";

import { Thread } from "@/types";
import { db } from "./firebase";
import { getOptimisticUser } from "./user";

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

export const getUserThreads = async () => {
  const currentUser = await getOptimisticUser();

  try {
    const threadsSnapshot = await db
      .collection("threads")
      .where("userIds", "array-contains", currentUser.id)
      .orderBy("updatedAt", "desc")
      .get();
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
};
