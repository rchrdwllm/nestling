"use client";

import { useState, useEffect, ReactNode } from "react";
import {
  subscribeUser,
  unsubscribeUser,
} from "@/server/actions/send-native-notifs";
import { useSubscriptionStore } from "@/context/notif-subscription-context";

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const NativeNotifWrapper = ({ children }: { children: ReactNode }) => {
  const { subscription, setSubscription, setIsSupported } =
    useSubscriptionStore();

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  useEffect(() => {
    if (subscription) subscribeToPush();

    return () => {
      unsubscribeFromPush();
    };
  }, [subscription]);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (err) {
      console.error("Service worker registration failed:", err);
    }
  }

  async function subscribeToPush() {
    if (!("Notification" in window)) {
      console.error("Notifications are not supported by this browser.");
      return;
    }
    if (Notification.permission !== "granted") {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("Notification permission not granted.");
          return;
        }
      } catch (err) {
        console.error("Error requesting notification permission:", err);
        return;
      }
    }
    if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
      console.error("VAPID public key is missing.");
      return;
    }
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        ),
      });
      setSubscription(sub);
      const serializedSub = JSON.parse(JSON.stringify(sub));
      await subscribeUser(serializedSub);
    } catch (err) {
      console.error("Push subscription failed:", err);
    }
  }

  async function unsubscribeFromPush() {
    try {
      await subscription?.unsubscribe();
      setSubscription(null);
      await unsubscribeUser();
    } catch (err) {
      console.error("Unsubscribe from push failed:", err);
    }
  }

  return <>{children}</>;
};

export default NativeNotifWrapper;
