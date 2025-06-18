"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { format } from "date-fns";
import { MessageWithFiles } from "@/types";
import ChatFileBubble from "./chat-file-bubble";

const ChatBubble = ({
  message,
  senderId,
  timestamp,
  type,
  files,
}: MessageWithFiles) => {
  const { user } = useCurrentUser();
  const isSender = useMemo(() => {
    return senderId === user.id;
  }, [user, senderId]);

  const formattedTime = useMemo(() => {
    const date = new Date(timestamp);
    return format(date, "hh:mm a");
  }, [timestamp]);

  return (
    <div className="flex flex-col gap-2">
      <article
        className={cn(
          "flex items-end gap-2 rounded-md p-2 w-max max-w-[55%] text-sm",
          isSender
            ? "ml-auto bg-primary text-primary-foreground"
            : "bg-muted-secondary"
        )}
      >
        <p>{message}</p>
        <span
          className={cn(
            "text-xs -mb-1 text-nowrap",
            isSender ? "text-white/50" : "text-foreground/50"
          )}
        >
          {formattedTime}
        </span>
      </article>
      {type === "file" && (
        <div
          className={cn(
            "max-w-[610px]",
            isSender ? "ml-auto justify-end" : "",
            "flex gap-1 flex-wrap"
          )}
        >
          {files.map((file) => (
            <ChatFileBubble key={file.secure_url} {...file} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
