"use server";

import { pusherServer } from "@/lib/pusher";
import { actionClient } from "../action-client";
import { InboxSchema } from "@/schemas/InboxSchema";
import { db } from "@/lib/firebase";
import { createThread } from "./create-thread";

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

      try {
        const data = await createThread({
          channelId,
          userIds: [senderId, receiverId],
          senderId,
          receiverId,
        });

        if (data?.data?.success) {
          const { id: threadId } = data.data.success;

          const dbMessageData = {
            ...messageData,
            threadId,
          };

          await db.collection("messages").doc(id).set(dbMessageData);

          return { success: dbMessageData };
        } else if (data?.data?.error) {
          console.error("Error creating thread:", data.data.error);

          return { error: data.data.error };
        }
      } catch (error) {
        console.error("Error sending message to Pusher:", error);

        return { error };
      }
    } catch (error) {
      console.error("Error sending message:", error);

      return { error };
    }
  });
