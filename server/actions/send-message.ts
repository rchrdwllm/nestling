"use server";

import { pusherServer } from "@/lib/pusher";
import { actionClient } from "../action-client";
import { InboxSchema } from "@/schemas/InboxSchema";
import { db } from "@/lib/firebase";

export const sendMessage = actionClient
  .schema(InboxSchema)
  .action(async ({ parsedInput }) => {
    const { message, senderId, receiverId, channelId } = parsedInput;

    try {
      const id = crypto.randomUUID();
      const messageData = {
        message,
        senderId,
        receiverId,
        channelId,
        id,
        timestamp: new Date().toISOString(),
      };

      await pusherServer.trigger(channelId, "new-message", messageData);
      await db.collection("messages").doc(id).set(messageData);

      return { success: messageData };
    } catch (error) {
      console.error("Error sending message:", error);

      return { error };
    }
  });
