"use server";

import { pusherServer } from "@/lib/pusher";
import { actionClient } from "../action-client";
import { InboxSchema } from "@/schemas/InboxSchema";
import { db } from "@/lib/firebase";
import { createThread } from "./create-thread";
import { createNotif } from "./create-notif";
import { getOptimisticUser, getUserById } from "@/lib/user";
import { updateThread } from "./update-thread";
import { sendNotification } from "./send-notification";

export const sendMessage = actionClient
  .schema(InboxSchema)
  .action(async ({ parsedInput }) => {
    const { message, senderId, receiverId, channelId, id, type, files } =
      parsedInput;
    const user = await getOptimisticUser();

    try {
      const messageData = {
        message,
        senderId,
        receiverId,
        channelId,
        id,
        timestamp: new Date().toISOString(),
        type,
      };

      await pusherServer.trigger(
        channelId,
        "new-message",
        files ? { ...messageData, files } : messageData,
      );

      try {
        const data = await createThread({
          channelId,
          userIds: [senderId, receiverId],
        });

        if (data?.data?.success) {
          const { id: threadId } = data.data.success;

          const dbMessageData = {
            ...messageData,
            threadId,
          };

          await db.collection("messages").doc(id).set(dbMessageData);

          const { success: receiver } = await getUserById(receiverId);

          await createNotif({
            type: "inbox",
            senderId,
            receiverIds: [receiver!.id],
            message,
            title: `From ${user.name}`,
            url: `/inbox/${channelId}`,
          });
          await sendNotification({
            title: `From ${user.name}`,
            body: message,
            userIds: [receiver!.id],
          });

          await updateThread(threadId);

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
