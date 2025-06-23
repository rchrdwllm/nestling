import { useEffect } from "react";
import { signOut } from "next-auth/react";

const IDLE_TIMEOUT = 60 * 60 * 1000; // 1 hour in milliseconds

export function useIdleLogout() {
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // Optionally, you can log this event to your user activity logs here
        signOut({ callbackUrl: "/auth/signin" });
      }, IDLE_TIMEOUT);
    };

    // List of events that indicate user activity
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
}
