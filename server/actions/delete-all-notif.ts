"use server";

import { DeleteAllNotifSchema } from "@/schemas/DeleteAllNotifSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";

export const deleteAllNotif = actionClient
  .schema(DeleteAllNotifSchema)
  .action(async ({ parsedInput }) => {
    const { userId } = parsedInput;

    try {
      const notifCollection = db.collection("notifications");
      const snapshot = await notifCollection
        .where("receiverId", "==", userId)
        .get();
      const batch = db.batch();

      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      revalidateTag("notifications");

      return { success: "Notifications cleared" };
    } catch (error) {
      console.error("Error deleting all notifications: " + error);

      return { error: JSON.stringify(error) };
    }
  });
