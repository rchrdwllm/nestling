"use server";

import { CreateThreadSchema } from "@/schemas/CreateThreadSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidatePath } from "next/cache";

export const createThread = actionClient
  .schema(CreateThreadSchema)
  .action(async ({ parsedInput }) => {
    const { channelId, userIds } = parsedInput;

    try {
      const existingThreadSnapshot = await db
        .collection("threads")
        .where("channelId", "==", channelId)
        .get();

      if (!existingThreadSnapshot.empty) {
        return { success: existingThreadSnapshot.docs[0].data() };
      }

      const id = crypto.randomUUID();
      const threadData = {
        id,
        channelId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userIds,
      };

      const threadRef = db.collection("threads").doc(id);

      await threadRef.set(threadData);

      revalidatePath("/inbox", "layout");
      revalidatePath("/inbox/[channelId]", "page");
      revalidatePath(`/inbox/${channelId}`);

      return { success: threadData };
    } catch (error) {
      console.error("Error creating thread:", error);

      return { error };
    }
  });
