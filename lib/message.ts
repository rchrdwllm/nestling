"use server";

import { File, Message, MessageWithFiles } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";

export const getChannelMessages = unstable_cache(
  async (channelId: string) => {
    try {
      const messagesRef = db
        .collection("messages")
        .where("channelId", "==", channelId)
        .orderBy("timestamp", "asc");
      const snapshot = await messagesRef.get();

      if (snapshot.empty) {
        return { success: [] };
      }

      const messages = snapshot.docs.map((doc) => doc.data() as Message);
      const withFiles: (Message | MessageWithFiles)[] = await Promise.all(
        messages.map(async (message) => {
          if (message.type === "file") {
            const { success: files, error } = await getMessageFiles(message.id);

            if (error) {
              console.error("Error fetching message files:", error);

              return { ...message, files: [] } as MessageWithFiles;
            }

            if (files) {
              return { ...message, files } as MessageWithFiles;
            }
          }

          return message;
        })
      );

      return { success: withFiles };
    } catch (error) {
      console.error("Error fetching messages:", error);

      return { error: "Failed to fetch messages" };
    }
  },
  ["channelId"]
);

export const getLatestMessage = async (channelId: string) => {
  try {
    const messagesRef = db
      .collection("messages")
      .where("channelId", "==", channelId)
      .orderBy("timestamp", "desc")
      .limit(1);
    const snapshot = await messagesRef.get();

    if (snapshot.empty) {
      return { success: null };
    }

    const message = snapshot.docs[0].data() as Message;

    return { success: message };
  } catch (error) {
    console.error("Error fetching latest message:", error);

    return { error: "Failed to fetch latest message" };
  }
};

export const getMessageFiles = async (messageId: string) => {
  try {
    const messageRef = await db
      .collection("messages")
      .doc(messageId)
      .collection("files")
      .orderBy("created_at", "desc")
      .get();
    const fileIds = messageRef.docs.map((doc) => doc.data()) as File[];
    const files = await Promise.all(
      fileIds.map(async (file) => {
        const fileRef = await db.collection("files").doc(file.public_id).get();
        const fileData = fileRef.data() as File;

        return fileData;
      })
    );

    return { success: files };
  } catch (error) {
    console.error("Error fetching message files:", error);

    return { error: "Failed to fetch message files" };
  }
};
