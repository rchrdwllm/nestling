import { ScrollArea } from "@/components/ui/scroll-area";
import ChatBubble from "./chat-bubble";
import { useCurrentUser } from "@/hooks/use-current-user";
import { pusherClient } from "@/lib/pusher";
import { useEffect, useRef, useState } from "react";
import { Message, MessageWithFiles } from "@/types";
import { generateChannelId } from "@/lib/utils";

type ChatProps = {
  receiverId: string;
  prevMessages?: MessageWithFiles[];
};

const Chat = ({ receiverId, prevMessages }: ChatProps) => {
  const { user } = useCurrentUser();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chatData, setChatData] = useState<MessageWithFiles[]>(
    prevMessages || []
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (user && receiverId) {
      const channelName = generateChannelId(user.id, receiverId);

      pusherClient.subscribe(channelName);

      pusherClient.bind("new-message", (data: MessageWithFiles) => {
        setChatData((prev) => [...prev, data]);
      });

      return () => {
        pusherClient.unbind_all();
        pusherClient.unsubscribe(channelName);
      };
    }
  }, [user, receiverId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({
        behavior: isInitialLoad ? "auto" : "smooth",
        block: "end",
      });

      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    }
  }, [chatData, chatContainerRef, isInitialLoad]);

  return (
    <div className="no-scrollbar overflow-y-auto h-[calc(100vh-1rem-72.8px-64.8px)] w-full px-4">
      <div ref={chatContainerRef} className="flex flex-col gap-4 py-4">
        {chatData.map((chat, index) => (
          <ChatBubble key={index} {...chat} />
        ))}
      </div>
    </div>
  );
};

export default Chat;
