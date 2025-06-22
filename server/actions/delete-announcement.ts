"use server";

import { DeleteAnnouncementSchema } from "@/schemas/DeleteAnnouncementSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";

export const deleteAnnouncement = actionClient
  .schema(DeleteAnnouncementSchema)
  .action(async ({ parsedInput }) => {
    const { announcementId } = parsedInput;

    try {
      const announcementRef = db
        .collection("announcements")
        .doc(announcementId);
      const announcementSnapshot = await announcementRef.get();

      if (!announcementSnapshot.exists) {
        return { error: "Announcement not found" };
      }

      await announcementRef.delete();

      revalidateTag("announcements");

      return { success: "Announcement deleted successfully" };
    } catch (error) {
      console.error("Error deleting announcement:", error);

      return { error: JSON.stringify(error) };
    }
  });
