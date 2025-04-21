"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { format } from "date-fns";

type ChatBubbleProps = {
  message: string;
  senderId: string;
  timestamp: string;
};

const ChatBubble = ({ message, senderId, timestamp }: ChatBubbleProps) => {
  const { user } = useCurrentUser();
  const isSender = useMemo(() => {
    return senderId === user.id;
  }, [user, senderId]);

  const formattedTime = useMemo(() => {
    const date = new Date(timestamp);
    return format(date, "hh:mm a");
  }, [timestamp]);

  return (
    <article
      className={cn(
        "flex items-end gap-2 rounded-md p-2 w-max max-w-[55%] text-sm",
        isSender ? "ml-auto bg-primary text-primary-foreground" : "bg-secondary"
      )}
    >
      <p>{message}</p>
      <span
        className={cn(
          "text-xs -mb-1",
          isSender ? "text-white/50" : "text-foreground/50"
        )}
      >
        {formattedTime}
      </span>
    </article>
  );
};

export default ChatBubble;
