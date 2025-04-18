"use server";

import { pusherServer } from "@/lib/pusher";
import { actionClient } from "../action-client";
import { InboxSchema } from "@/schemas/InboxSchema";

export const sendMessage = actionClient
  .schema(InboxSchema)
  .action(async ({ parsedInput }) => {
    const { message, senderId, receiverId } = parsedInput;

    try {
      const data = {
        message,
        senderId,
        receiverId,
        timestamp: new Date().toISOString(),
      };

      const adsf = await pusherServer.trigger(
        "chat-channel",
        "new-message",
        data
      );

      console.log(adsf);

      return { success: data };
    } catch (error) {
      console.error("Error sending message:", error);

      return { error };
    }
  });
