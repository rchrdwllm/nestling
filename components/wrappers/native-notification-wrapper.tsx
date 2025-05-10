"use client";

import { useState, useEffect, ReactNode } from "react";
import {
  subscribeUser,
  unsubscribeUser,
} from "@/server/actions/send-notification";
import { useUser } from "@/hooks/use-user";
import { User } from "@/types";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function PushNotificationManager({ authUser }: { authUser?: User | null }) {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const { user } = useUser();

  useEffect(() => {
    if (!user || !authUser) return;

    if (!authUser.notifsEnabled) return;

    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
      subscribeToPush();
    }
  }, [user, authUser]);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub);
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  return <></>;
}

type NativeNotificationWrapperProps = {
  authUser?: string;
  children: ReactNode;
};

const NativeNotificationWrapper = ({
  authUser,
  children,
}: NativeNotificationWrapperProps) => {
  const authUserData = authUser ? (JSON.parse(authUser) as User) : null;

  return (
    <div>
      <PushNotificationManager authUser={authUserData} />
      {children}
    </div>
  );
};

export default NativeNotificationWrapper;
