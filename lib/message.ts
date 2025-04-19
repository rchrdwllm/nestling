"use server";

import { db } from "./firebase";

export const getChannelMessages = async (channelId: string) => {
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
};
