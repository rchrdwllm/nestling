"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type ChatBubbleProps = {
  message: string;
  sender: string;
  timestamp: string;
};

const ChatBubble = ({ message, sender, timestamp }: ChatBubbleProps) => {
  const { user } = useCurrentUser();
  const isSender = useMemo(() => {
    return sender === user.id;
  }, [user, sender]);

  return (
    <article
      className={cn(
        "flex gap-2 rounded-md p-2 w-max max-w-[55%] text-sm",
        isSender ? "ml-auto bg-primary text-primary-foreground" : "bg-secondary"
      )}
    >
      {sender}: {message} at {timestamp}
    </article>
  );
};

export default ChatBubble;
