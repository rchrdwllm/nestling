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

  // Create a unique fingerprint for this subscription to avoid duplicates
  const endpoint = sub.endpoint;
  const subscriptionFingerprint =
    endpoint.split("/").pop() || crypto.randomUUID();

  try {
    // Use a unique ID for each subscription instead of user ID
    const subscriptionId = `${user.id}_${subscriptionFingerprint}`;

    await db
      .collection("subscriptions")
      .doc(subscriptionId)
      .set({
        sub: JSON.stringify(sub),
        userId: user.id,
        endpoint: endpoint,
        fingerprint: subscriptionFingerprint,
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
  if (!subscription) return { success: false, error: "No active subscription" };

  const user = await getOptimisticUser();
  const endpoint = subscription.endpoint;
  const subscriptionFingerprint = endpoint.split("/").pop() || "";

  try {
    // Delete only the specific subscription for this device
    const subscriptionId = `${user.id}_${subscriptionFingerprint}`;
    await db.collection("subscriptions").doc(subscriptionId).delete();

    subscription = null;
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
    // Query all subscriptions for the specified users
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
