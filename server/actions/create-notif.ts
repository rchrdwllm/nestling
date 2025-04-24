"use server";

import { db } from "@/lib/firebase";
import { actionClient } from "../action-client";
import { CreateNotifSchema } from "@/schemas/CreateNotifSchema";
import { Timestamp } from "firebase/firestore";

export const createNotif = actionClient
  .schema(CreateNotifSchema)
  .action(async ({ parsedInput }) => {
    const { type, title, message, url, senderId, receiverIds } = parsedInput;

    try {
      const id = crypto.randomUUID();

      const notification = {
        id,
        type,
        title,
        message,
        url,
        senderId,
        createdAt: Timestamp.now().toDate(),
        receiverIds,
      };

      await db.collection("notifications").doc(id).set(notification);

      console.log("Notification created:", notification);

      return { success: "Notification created" };
    } catch (error) {
      console.error("Error creating notification:", error);

      return { error };
    }
  });
