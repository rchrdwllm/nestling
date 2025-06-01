"use client";

import { ReactNode, useEffect } from "react";
import { Notification, User } from "@/types";
import { toast } from "sonner";
import { clientDb } from "@/lib/firebase-client";
import {
  and,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Button } from "../ui/button";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

type NotificationWrapperProps = {
  authUser?: string;
  children: ReactNode;
};

const NotificationWrapper = ({
  authUser,
  children,
}: NotificationWrapperProps) => {
  const { user } = useUser();
  const authUserData = authUser ? (JSON.parse(authUser) as User) : null;
  useEffect(() => {
    if (!user || !authUserData || !authUserData.notifsEnabled) return;
    const startTime = new Date().toISOString();

    const q = query(
      collection(clientDb, "notifications"),
      and(
        where("receiverId", "==", user.id),
        where("isRead", "==", false),
        where("createdAt", ">", startTime)
      ),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log("Notification change detected:", change);

        if (change.type === "added") {
          const notification = change.doc.data() as Notification;

          console.log("New notification received:", notification);

          fetch("/api/revalidate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pathname: notification.url }),
          });

          if (notification.type === "inbox") {
            toast(`${notification.title}`, {
              description: notification.message,
              action: (
                <Link href={notification.url}>
                  <Button variant="secondary">View message</Button>
                </Link>
              ),
              duration: 100000,
              className: "flex items-center justify-between gap-2",
            });
          } else {
            toast(`${notification.title}`, {
              description: notification.message,
              action: (
                <Link href={notification.url}>
                  <Button variant="secondary">View</Button>
                </Link>
              ),
              duration: 100000,
              className: "flex items-center justify-between gap-2",
            });
          }
        }
      });
    });

    return () => unsubscribe();
  }, [user, authUserData]);

  return <>{children}</>;
};

export default NotificationWrapper;
