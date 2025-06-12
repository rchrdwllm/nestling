"use server";

import { UniversalAnnouncement } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";
import { parseISO } from "date-fns";

function flattenUniversalAnnouncement(doc: any): UniversalAnnouncement {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt
      ? parseISO(
          typeof data.createdAt === "string"
            ? data.createdAt
            : data.createdAt.toDate().toISOString()
        )
      : null,
  };
}

export const getAllUniversalAnnouncements = unstable_cache(
  async (limit: number = 10) => {
    try {
      const announcementsRef = await db
        .collection("universalAnnouncements")
        .where("isArchived", "==", false)
        .orderBy("createdAt", "desc")
        .limit(limit)
        .get();

      const announcements = announcementsRef.docs.map(flattenUniversalAnnouncement);

      return { success: announcements };
    } catch (error) {
      console.error("Error fetching universal announcements:", error);
      return { error: "Failed to fetch universal announcements" };
    }
  },
  ["universalAnnouncements"],
  { revalidate: 60 * 60, tags: ["universalAnnouncements"] }
);

export const getArchivedUniversalAnnouncements = unstable_cache(
  async (limit: number = 10) => {
    try {
      const announcementsRef = await db
        .collection("universalAnnouncements")
        .where("isArchived", "==", true)
        .orderBy("createdAt", "desc")
        .limit(limit)
        .get();

      const announcements = announcementsRef.docs.map(flattenUniversalAnnouncement);

      return { success: announcements };
    } catch (error) {
      console.error("Error fetching archived universal announcements:", error);
      return { error: "Failed to fetch archived universal announcements" };
    }
  },
  ["archivedUniversalAnnouncements"],
  { revalidate: 60 * 60, tags: ["universalAnnouncements"] }
);