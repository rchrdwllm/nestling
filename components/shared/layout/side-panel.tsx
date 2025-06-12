"use client";

import SidePanelNotifications from "@/components/shared/layout/sidepanel-notifications";
import { Button } from "@/components/ui/button";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { useCurrentUser } from "@/hooks/use-current-user";
import { clientDb } from "@/lib/firebase-client";
import { Content, Notification, Task } from "@/types";
import {
  and,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ChevronsLeft, ChevronsRight, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState, useTransition } from "react";
import SidePanelTasks from "./sidepanel-tasks";
import { getUpcomingAssignmentsForStudent } from "@/lib/content";
import { getIncompleteUserTasks } from "@/lib/task";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [studentTasks, setStudentTasks] = useState<Content[]>([]);
  const [employeeTasks, setEmployeeTasks] = useState<Task[]>([]);

  const fetchStudentTasks = async () => {
    const { success: tasks, error } = await getUpcomingAssignmentsForStudent(
      user.id
    );

    if (error || !tasks) {
      console.error("Error fetching student tasks: ", error);
      return;
    }

    setStudentTasks(tasks); // <-- Correct: set to the fetched tasks!
  };

  const fetchEmployeeTasks = async () => {
    const { success: tasks, error } = await getIncompleteUserTasks(user.id);

    if (error || !tasks) {
      console.error("Error fetching employee tasks: ", error);

      return;
    }

    setEmployeeTasks(tasks);
  };

  useEffect(() => {
    if (!user || !user.id) return;

    if (user.role === "student") {
      fetchStudentTasks();
    } else if (user.role === "admin" || user.role === "instructor") {
      fetchEmployeeTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, user?.role]);

  useEffect(() => {
    const q = query(
      collection(clientDb, "notifications"),
      and(where("receiverId", "==", user.id), where("isRead", "==", false)),
      orderBy("createdAt", "desc")
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
            prev.filter((notification) => notification.id !== notificationId)
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
        <div className="fixed top-1/2 right-3 z-50 p-2 -translate-y-1/2">
          <Button
            onClick={() => {
              setRightPanelToggled(true);
              setIsHovered(false);
            }}
            variant="outline"
            className="rounded-lg shadow-lg bg-white text-black border border-gray-200 hover:bg-gray-100 transition"
            style={{
              width: 64,
              height: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <ChevronsLeft className="size-6" />
          </Button>
        </div>
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
            className="absolute z-20 right-2 lg:right-auto h-[calc(100%-1rem)] border border-border rounded-xl w-[314px] lg:h-auto lg:w-[400px] lg:relative bg-background lg:p-0 shadow-sm"
          >
            <ScrollArea className="h-full">
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
                <SidePanelTasks
                  tasks={user.role === "student" ? studentTasks : employeeTasks}
                />
              </div>
            </ScrollArea>
          </MotionWrapper>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidePanel;
