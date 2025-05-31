"use client";

import SidePanelNotifications from "@/components/shared/layout/sidepanel-notifications";
import { Button } from "@/components/ui/button";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { useCurrentUser } from "@/hooks/use-current-user";
import { clientDb } from "@/lib/firebase-client";
import { Content, Notification, Task } from "@/types";
import { and, collection, onSnapshot, query, where } from "firebase/firestore";
import { ChevronsLeft, ChevronsRight, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState, useTransition } from "react";
import SidePanelTasks from "./sidepanel-tasks";
import { getUpcomingAssignmentsForStudent } from "@/lib/content";
import { getIncompleteUserTasks } from "@/lib/task";

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
  const [isPending, startTransition] = useTransition();
  const [studentTasks, setStudentTasks] = useState<Content[]>([]);
  const [employeeTasks, setEmployeeTasks] = useState<Task[]>([]);

  const fetchStudentTasks = async () => {
    startTransition(async () => {
      const { success: tasks, error } = await getUpcomingAssignmentsForStudent(
        user.id
      );

      if (error || !tasks) {
        console.error("Error fetching student tasks: ", error);

        return;
      }

      setStudentTasks(studentTasks);
    });
  };

  const fetchEmployeeTasks = async () => {
    startTransition(async () => {
      const { success: tasks, error } = await getIncompleteUserTasks(user.id);

      if (error || !tasks) {
        console.error("Error fetching student tasks: ", error);

        return;
      }

      setEmployeeTasks(tasks);
    });
  };

  useEffect(() => {
    if (user.role === "student") {
      fetchStudentTasks();
    } else if (user.role === "admin" || user.role === "instructor") {
      fetchEmployeeTasks();
    }
  }, [user]);

  useEffect(() => {
    const q = query(
      collection(clientDb, "notifications"),
      and(where("receiverId", "==", user.id))
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
        <MotionWrapper
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute w-[calc(50px+2rem)] top-1/2 right-0 h-[25vh] z-10 p-4 -translate-y-1/2"
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
            className="overflow-y-auto w-full border border-border rounded-xl lg:w-[400px] lg:sticky relative bg-background lg:p-0 shadow-sm"
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
              <SidePanelTasks
                tasks={user.role === "student" ? studentTasks : employeeTasks}
              />
            </div>
          </MotionWrapper>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidePanel;
