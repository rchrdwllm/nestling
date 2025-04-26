"use server";

import { Message } from "@/types";
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

      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { success: messages };
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
