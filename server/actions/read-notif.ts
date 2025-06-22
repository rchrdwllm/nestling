"use server";

import { ReadNotifSchema } from "@/schemas/ReadNotifSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";
import { Notification } from "@/types";

export const readNotif = actionClient
  .schema(ReadNotifSchema)
  .action(async ({ parsedInput }) => {
    const { notifId } = parsedInput;

    try {
      const notifRef = db.collection("notifications").doc(notifId);
      const notifSnapshot = await notifRef.get();

      if (!notifSnapshot.exists) {
        return { error: "Notification not found" };
      }

      const notifData = notifSnapshot.data() as Notification;
      const isRead = notifData.isRead;

      await notifRef.update({
        isRead: !isRead,
      });

      revalidateTag("notifications");

      return {
        success: isRead
          ? "Notification marked as unread"
          : "Notification marked as read",
      };
    } catch (error) {
      console.error("Error reading notification:", error);

      return { error: JSON.stringify(error) };
    }
  });
