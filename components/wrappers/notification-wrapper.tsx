"use client";

import { ReactNode, useEffect } from "react";
import { Notification } from "@/types";
import { toast } from "sonner";
import { clientDb } from "@/lib/firebase-client";
import { and, collection, onSnapshot, query, where } from "firebase/firestore";
import { Button } from "../ui/button";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

const NotificationWrapper = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(clientDb, "notifications"),
      and(
        where("receiverIds", "array-contains", user.id),
        where("createdAt", ">", new Date(Date.now()))
      )
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change.doc.data());
        if (change.type === "added") {
          const notification = change.doc.data() as Notification;

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
        }
      });
    });

    return () => unsubscribe();
  }, [user]);

  return <>{children}</>;
};

export default NotificationWrapper;
