"use server";

import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { Notification } from "@/types";

export const getUnreadNotifs = unstable_cache(
  async (userId: string, limit: number = 5, lastDocId?: string) => {
    try {
      let query = db
        .collection("notifications")
        .where("receiverId", "==", userId)
        .where("isRead", "==", false)
        .orderBy("createdAt", "desc")
        .limit(limit + 1);

      if (lastDocId) {
        const lastDoc = await db
          .collection("notifications")
          .doc(lastDocId)
          .get();
        query = query.startAfter(lastDoc);
      }

      const notifsSnapshot = await query.get();
      const docs = notifsSnapshot.docs;
      const hasMore = docs.length > limit;
      const notifications = docs
        .slice(0, limit)
        .map((doc) => doc.data()) as Notification[];

      return {
        success: notifications,
        lastDocId: notifications.length
          ? docs[Math.min(limit, docs.length) - 1].id
          : null,
        hasMore,
      };
    } catch (error) {
      console.error("Error fetching user unread notifications:", error);

      return { error };
    }
  },
  ["userId", "limit", "lastDocId"],
  { revalidate: 60 * 60, tags: ["notifications"] }
);

export const getReadNotifs = unstable_cache(
  async (userId: string, limit: number = 5, lastDocId?: string) => {
    try {
      let query = db
        .collection("notifications")
        .where("receiverId", "==", userId)
        .where("isRead", "==", true)
        .orderBy("createdAt", "desc")
        .limit(limit + 1);

      if (lastDocId) {
        const lastDoc = await db
          .collection("notifications")
          .doc(lastDocId)
          .get();
        query = query.startAfter(lastDoc);
      }

      const notifsSnapshot = await query.get();
      const docs = notifsSnapshot.docs;
      const hasMore = docs.length > limit;
      const notifications = docs
        .slice(0, limit)
        .map((doc) => doc.data()) as Notification[];

      return {
        success: notifications,
        lastDocId: notifications.length
          ? docs[Math.min(limit, docs.length) - 1].id
          : null,
        hasMore,
      };
    } catch (error) {
      console.error("Error fetching read notifications:", error);

      return { error };
    }
  },
  ["userId", "limit", "lastDocId"],
  { revalidate: 60 * 60, tags: ["notifications"] }
);
