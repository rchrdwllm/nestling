"use server";

import { File, Message, MessageWithFiles } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";

const messageCache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

const getCachedData = async (key: string, fetchFn: () => Promise<any>) => {
  const cached = messageCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await fetchFn();
  messageCache.set(key, { data, timestamp: Date.now() });
  return data;
};

export const getChannelMessages = unstable_cache(
  async (
    channelId: string,
    limit: number = 20,
    lastMessageTimestamp?: string
  ) => {
    try {
      let messagesRef = db
        .collection("messages")
        .where("channelId", "==", channelId)
        .orderBy("timestamp", "desc")
        .limit(limit);

      if (lastMessageTimestamp) {
        messagesRef = messagesRef.startAfter(lastMessageTimestamp);
      }

      const snapshot = await messagesRef.get();

      if (snapshot.empty) {
        return { success: [], hasMore: false };
      }

      const messages = snapshot.docs.map((doc) => doc.data() as Message);

      const fileMessageIds = messages
        .filter((msg) => msg.type === "file")
        .map((msg) => msg.id);

      let fileMessagesMap = new Map();

      if (fileMessageIds.length > 0) {
        const cacheKey = `files-${fileMessageIds.join(",")}`;

        fileMessagesMap = await getCachedData(cacheKey, async () => {
          const filesMap = new Map();

          for (let i = 0; i < fileMessageIds.length; i += 5) {
            const batch = fileMessageIds.slice(i, i + 5);
            const batchResults = await Promise.all(
              batch.map(async (messageId) => {
                const { success: files } = await getMessageFilesInternal(
                  messageId
                );
                return { messageId, files: files || [] };
              })
            );

            batchResults.forEach(({ messageId, files }) => {
              filesMap.set(messageId, files);
            });
          }

          return filesMap;
        });
      }

      const withFiles: (Message | MessageWithFiles)[] = messages.map(
        (message) => {
          if (message.type === "file") {
            const files = fileMessagesMap.get(message.id) || [];
            return { ...message, files } as MessageWithFiles;
          }
          return message;
        }
      );

      const orderedMessages = withFiles.reverse();
      const hasMore = snapshot.docs.length === limit;

      return { success: orderedMessages, hasMore };
    } catch (error) {
      console.error("Error fetching messages:", error);
      return { error: "Failed to fetch messages" };
    }
  },
  ["channelId", "limit", "lastMessageTimestamp"],
  {
    revalidate: 300,
    tags: ["messages"],
  }
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

const getMessageFilesInternal = async (messageId: string) => {
  try {
    const messageRef = await db
      .collection("messages")
      .doc(messageId)
      .collection("files")
      .orderBy("created_at", "desc")
      .limit(10)
      .get();

    if (messageRef.empty) {
      return { success: [] };
    }

    const fileRefs = messageRef.docs.map((doc) => doc.data()) as File[];
    const files: File[] = [];
    const publicIds = fileRefs.map((file) => file.public_id).filter(Boolean);

    if (publicIds.length === 0) {
      return { success: [] };
    }

    for (let i = 0; i < publicIds.length; i += 10) {
      const batch = publicIds.slice(i, i + 10);
      const filesQuery = await db
        .collection("files")
        .where("public_id", "in", batch)
        .get();

      const batchFiles = filesQuery.docs.map((doc) => doc.data() as File);
      files.push(...batchFiles);
    }

    return { success: files };
  } catch (error) {
    console.error("Error fetching message files:", error);

    return { error: "Failed to fetch message files" };
  }
};

export const getMessageFiles = unstable_cache(
  getMessageFilesInternal,
  ["messageId"],
  {
    revalidate: 600,
    tags: ["messageFiles"],
  }
);
