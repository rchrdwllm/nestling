"use client";

import SidePanelNotifications from "@/components/shared/notifications/sidepanel-notifications";
import { Button } from "@/components/ui/button";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { useCurrentUser } from "@/hooks/use-current-user";
import { clientDb } from "@/lib/firebase-client";
import { Notification } from "@/types";
import { and, collection, onSnapshot, query, where } from "firebase/firestore";
import { ChevronsLeft, ChevronsRight, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { use, useEffect, useState } from "react";

type SidePanelProps = {
  setRightPanelToggled: (toggled: boolean) => void;
  rightPanelToggled: boolean;
};

const SidePanel = ({
  setRightPanelToggled,
  rightPanelToggled,
}: SidePanelProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useCurrentUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const q = query(
      collection(clientDb, "notifications"),
      and(where("receiverIds", "array-contains", user.id)),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const notification = change.doc.data() as Notification;
          setNotifications((prev) => [...prev, notification]);
        }

        if (change.type === "removed") {
          const notificationId = change.doc.id;
          setNotifications((prev) =>
            prev.filter((notification) => notification.id !== notificationId),
          );
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {!rightPanelToggled && (
        <MotionWrapper
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute w-[calc(50px+2rem)] top-0 right-0 h-screen z-10 p-4"
        >
          <MotionWrapper
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : "100%" }}
            className="h-full"
          >
            <Button
              onClick={() => {
                setRightPanelToggled(true);
                setIsHovered(false);
              }}
              variant="outline"
              className="px-4 h-full"
            >
              <ChevronsLeft className="size-5" />
            </Button>
          </MotionWrapper>
        </MotionWrapper>
      )}
      <AnimatePresence initial={false} mode="popLayout">
        {rightPanelToggled && (
          <MotionWrapper
            initial={{ opacity: 0, x: "100%" }}
            animate={{
              opacity: rightPanelToggled ? 1 : 0,
              x: rightPanelToggled ? 0 : "100%",
            }}
            exit={{ opacity: 0, x: "100%" }}
            className="w-full border border-border rounded-xl lg:w-[400px] lg:sticky relative bg-background lg:p-0 shadow-sm"
          >
            <div className="flex flex-col space-y-6 p-6">
              <div>
                <Button
                  onClick={() => setRightPanelToggled(false)}
                  variant="outline"
                  className="px-2"
                >
                  <ChevronsRight className="size-5" />
                </Button>
              </div>
              <SidePanelNotifications notifications={notifications} />
              {/* Notifications */}
              {/* {notifications.length > 0 && (
                <div className="bg-white rounded-lg shadow-xl border border-border p-6">
                  <h3 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center">
                    <Image
                      src={notifbell}
                      alt="Notification Bell"
                      width={48}
                      height={48}
                      className="mr-2"
                    />
                    Notifications
                  </h3>
                  <ul className="space-y-4">
                    {notifications.map((notification, index) => (
                      <li key={index} className="flex items-start">
                        <div>
                          <p className="text-sm text-foreground font-semibold">
                            <span className="text-primary">{notification.title}</span>{" "}
                            - {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            CS 001 - Introduction to Computing
                          </p>
                          <p className="text-xs text-muted-foreground">4h ago</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}

              {/* Pending Tasks */}
              {/* {pendingTasks.length > 0 && (
                <div className="bg-white rounded-lg shadow-xl border border-black-900 p-6">
                  <h3 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center">
                    <Image
                      src={pending}
                      alt="Pending Tasks"
                      width={40}
                      height={40}
                      className="mr-2"
                    />
                    Pending Tasks
                  </h3>
                  <ul className="space-y-4">
                    {pendingTasks.map((task, index) => (
                      <li key={index} className="flex items-start">
                        <div>
                          <p className="text-sm text-foreground font-semibold">
                            {task.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {task.courseCode} - {task.courseName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {task.timeAgo}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}
            </div>
          </MotionWrapper>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidePanel;
