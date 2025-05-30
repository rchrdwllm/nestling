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
      const batch = db.batch();

      receiverIds?.forEach((receiverId) => {
        const id = crypto.randomUUID();
        const notificationRef = db.collection("notifications").doc(id);

        batch.set(notificationRef, {
          id,
          type,
          title,
          message,
          url,
          senderId,
          createdAt: Timestamp.now().toDate(),
          receiverId,
        });
      });

      await batch.commit();

      return { success: "Notification created" };
    } catch (error) {
      console.error("Error creating notification:", error);

      return { error };
    }
  });
