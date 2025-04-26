"use server";

import { db } from "@/lib/firebase";
import { revalidatePath } from "next/cache";

export const updateThread = async (threadId: string) => {
  try {
    const threadRef = db.collection("threads").doc(threadId);

    await threadRef.update({
      updatedAt: new Date().toISOString(),
    });

    revalidatePath("/(student)/student-inbox", "layout");
    revalidatePath("/(student)/student-inbox/[channelId]", "page");
    revalidatePath("/(instructor)/instructor-inbox", "layout");
    revalidatePath("/(instructor)/instructor-inbox/[channelId]", "page");

    return { success: "Thread updated" };
  } catch (error) {
    console.error("Error updating thread:", error);

    return { error };
  }
};
