"use server";

import { pusherServer } from "@/lib/pusher";
import { actionClient } from "../action-client";
import { InboxSchema } from "@/schemas/InboxSchema";
import { generateChatChannelName } from "@/lib/utils";

export const sendMessage = actionClient
  .schema(InboxSchema)
  .action(async ({ parsedInput }) => {
    const { message, senderId, receiverId } = parsedInput;

    try {
      const messageData = {
        message,
        senderId,
        receiverId,
        timestamp: new Date().toISOString(),
      };

      const channelName = generateChatChannelName(senderId, receiverId);
      await pusherServer.trigger(channelName, "new-message", messageData);

      return { success: messageData };
    } catch (error) {
      console.error("Error sending message:", error);

      return { error };
    }
  });
