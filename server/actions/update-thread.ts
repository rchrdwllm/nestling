"use server";

import { db } from "@/lib/firebase";

export const updateThread = async (threadId: string) => {
  try {
    const threadRef = db.collection("threads").doc(threadId);

    threadRef.update({
      updatedAt: new Date().toISOString(),
    });

    return { success: "Thread updated" };
  } catch (error) {
    console.error("Error updating thread:", error);

    return { error };
  }
};
