"use server";

import { Thread } from "@/types";
import { db } from "./firebase";
import { getOptimisticUser } from "./user";

export const getUserThreads = async () => {
  const currentUser = await getOptimisticUser();

  try {
    const threadsSnapshot = await db
      .collection("threads")
      .where("userIds", "array-contains", currentUser.id)
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
