"use server";

import webpush from "web-push";
import { actionClient } from "../action-client";
import { SendNativeNotifSchema } from "@/schemas/SendNativeNotifSchema";
import { getOptimisticUser } from "@/lib/user";
import { db } from "@/lib/firebase";

webpush.setVapidDetails(
  "https://nestling-ten.vercel.app/",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function subscribeUser(sub: webpush.PushSubscription) {
  const user = await getOptimisticUser();

  if (!user) {
    console.error("User not found. Cannot subscribe to notifications.");

    return { error: "User not found", success: false };
  }

  const userRef = db.collection("users").doc(user.id);

  await userRef.update({
    subscription: JSON.stringify(sub),
  });

  const subRef = db.collection("subscriptions").doc(user.id);
  const subDoc = await subRef.get();

  if (subDoc.exists) {
    await subRef.update({
      subscription: JSON.stringify(sub),
    });
  } else {
    await subRef.set({
      subscription: JSON.stringify(sub),
      userId: user.id,
    });
  }

  return { success: true };
}

export async function unsubscribeUser() {
  const user = await getOptimisticUser();

  if (!user) {
    console.error("User not found. Cannot unsubscribe from notifications.");

    return { error: "User not found", success: false };
  }

  const userRef = db.collection("users").doc(user.id);

  await userRef.update({
    subscription: null,
  });

  const subRef = db.collection("subscriptions").doc(user.id);

  await subRef.delete();

  return { success: true };
}

export const sendNativeNotif = actionClient
  .schema(SendNativeNotifSchema)
  .action(async ({ parsedInput }) => {
    const { body, title, receiverIds } = parsedInput;

    try {
      const userSubs = await db
        .collection("subscriptions")
        .where("userId", "in", receiverIds)
        .get();

      userSubs.forEach(async (doc) => {
        const sub = JSON.parse(doc.data().subscription);

        await webpush.sendNotification(
          sub,
          JSON.stringify({
            title,
            body,
          })
        );
      });

      return { success: true };
    } catch (error) {
      console.error("Error sending push notification:", error);

      return { success: false, error: "Failed to send notification" };
    }
  });
