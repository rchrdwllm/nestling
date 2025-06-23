"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { signOut } from "next-auth/react";
import { IDLE_TIMEOUT } from "@/constants/timeout";

const IdleLogoutWrapper = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setIsOpen(true);
      }, IDLE_TIMEOUT);
    };

    const events = [
      "mousemove",
      "keydown",
      "mousedown",
      "touchstart",
      "scroll",
    ];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(timeout);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      signOut();
    }
  }, [isOpen]);

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You have been logged out due to inactivity
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have been inactive for a while (1 hour). For security reasons,
              you have been logged out. Please log in again to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsOpen(false)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {children}
    </>
  );
};

export default IdleLogoutWrapper;
