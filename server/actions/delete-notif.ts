"use server";

import { DeleteNotifSchema } from "@/schemas/DeleteNotifSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";

export const deleteNotif = actionClient
  .schema(DeleteNotifSchema)
  .action(async ({ parsedInput }) => {
    const { notificationId } = parsedInput;

    try {
      const notificationRef = await db
        .collection("notifications")
        .doc(notificationId)
        .get();

      if (!notificationRef.exists) {
        console.error("Notification not found");

        return { error: "Notification not found" };
      }

      await db.collection("notifications").doc(notificationId).delete();

      revalidateTag("notifications");

      return { success: "Notification deleted" };
    } catch (error) {
      console.error("Error deleting notification: " + error);

      return { error };
    }
  });
