"use server";

import { db } from "@/lib/firebase";
import { actionClient } from "../action-client";
import { ArchiveAnnouncementSchema } from "@/schemas/ArchiveAnnouncementSchema";
import { revalidateTag } from "next/cache";

export const archiveAnnouncement = actionClient
  .schema(ArchiveAnnouncementSchema)
  .action(async ({ parsedInput }) => {
    const { announcementId } = parsedInput;

    try {
      const announcementRef = await db
        .collection("announcements")
        .doc(announcementId)
        .get();

      if (!announcementRef.exists) {
        return { error: "Announcement not found" };
      }

      const announcement = announcementRef.data();

      await db
        .collection("announcements")
        .doc(announcementId)
        .update({
          isArchived: announcement?.isArchived ? false : true,
          archivedAt: new Date().toISOString(),
        });

      revalidateTag("announcements");

      return {
        success: `Announcement ${
          announcement?.isArchived ? "unarchived" : "archived"
        }`,
      };
    } catch (error) {
      console.error("Error archiving announcement:", error);

      return { error: "Failed to archive announcement" };
    }
  });
