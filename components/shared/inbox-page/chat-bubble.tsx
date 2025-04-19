"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";

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

  return (
    <article
      className={cn(
        "flex gap-2 rounded-md p-2 w-max max-w-[55%] text-sm",
        isSender ? "ml-auto bg-primary text-primary-foreground" : "bg-secondary"
      )}
    >
      {senderId}: {message} at {timestamp}
    </article>
  );
};

export default ChatBubble;
