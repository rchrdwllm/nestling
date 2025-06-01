"use server";

import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { Notification } from "@/types";

export const getUnreadNotifs = unstable_cache(
  async (userId: string) => {
    try {
      const notifsSnapshot = await db
        .collection("notifications")
        .where("receiverId", "==", userId)
        .where("isRead", "==", false)
        .get();
      const notifications = notifsSnapshot.docs.map((doc) =>
        doc.data()
      ) as Notification[];

      return { success: notifications };
    } catch (error) {
      console.error("Error fetching unread notifications:", error);

      return { error };
    }
  },
  ["userId"],
  { revalidate: 60 * 60, tags: ["notifications"] }
);

export const getReadNotifs = unstable_cache(
  async (userId: string) => {
    try {
      const notifsSnapshot = await db
        .collection("notifications")
        .where("receiverId", "==", userId)
        .where("isRead", "==", true)
        .get();
      const notifications = notifsSnapshot.docs.map((doc) =>
        doc.data()
      ) as Notification[];

      return { success: notifications };
    } catch (error) {
      console.error("Error fetching read notifications:", error);

      return { error };
    }
  },
  ["userId"],
  { revalidate: 60 * 60, tags: ["notifications"] }
);
