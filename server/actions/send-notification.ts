"use server";

import { db } from "@/lib/firebase";
import { getOptimisticUser } from "@/lib/user";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:rwilliam.flores@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

let subscription: webpush.PushSubscription | null = null;

export async function subscribeUser(sub: webpush.PushSubscription) {
  subscription = sub;

  const user = await getOptimisticUser();

  try {
    await db
      .collection("subscriptions")
      .doc(user.id)
      .set({
        sub: JSON.stringify(sub),
        userId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

    return { success: true };
  } catch (error) {
    console.error("Error saving subscription to database:", error);

    return { success: false, error: "Failed to save subscription" };
  }
}

export async function unsubscribeUser() {
  subscription = null;

  const user = await getOptimisticUser();

  try {
    await db.collection("subscriptions").doc(user.id).delete();

    return { success: true };
  } catch (error) {
    console.error("Error removing subscription from database:", error);

    return { success: false, error: "Failed to remove subscription" };
  }
}

export async function sendNotification({
  title,
  body,
  userIds,
}: {
  title: string;
  body: string;
  userIds: string[];
}) {
  try {
    const subsRef = await db
      .collection("subscriptions")
      .where("userId", "in", userIds)
      .get();
    const subscriptions = subsRef.docs.map((doc) => {
      const data = doc.data();
      return JSON.parse(data.sub) as webpush.PushSubscription;
    });

    if (subscriptions.length === 0) {
      throw new Error("No subscriptions found for the specified users");
    }

    await Promise.all(
      subscriptions.map((sub) =>
        webpush
          .sendNotification(
            sub,
            JSON.stringify({
              title,
              body,
              icon: "/icon.png",
            })
          )
          .catch((err) => {
            console.error("Error sending notification to a subscription:", err);
          })
      )
    );

    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
