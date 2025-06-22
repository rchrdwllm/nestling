"use server";

import { db } from "@/lib/firebase";
import { revalidatePath } from "next/cache";

export const updateThread = async (threadId: string) => {
  try {
    const threadRef = db.collection("threads").doc(threadId);

    await threadRef.update({
      updatedAt: new Date().toISOString(),
    });

    revalidatePath("/inbox", "layout");
    revalidatePath("/inbox/[channelId]", "page");

    return { success: "Thread updated" };
  } catch (error) {
    console.error("Error updating thread:", error);

    return { error: JSON.stringify(error) };
  }
};
