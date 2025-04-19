import { ScrollArea } from "@/components/ui/scroll-area";
import ChatBubble from "./chat-bubble";
import { useCurrentUser } from "@/hooks/use-current-user";
import { pusherClient } from "@/lib/pusher";
import { useEffect, useRef, useState } from "react";
import { Message } from "@/types";
import { generateChatChannelName } from "@/lib/utils";

type ChatProps = {
  receiverId: string;
};

const Chat = ({ receiverId }: ChatProps) => {
  const { user } = useCurrentUser();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chatData, setChatData] = useState<Message[]>([]);

  useEffect(() => {
    if (user && receiverId) {
      const channelName = generateChatChannelName(user.id, receiverId);

      pusherClient.subscribe(channelName);

      pusherClient.bind("new-message", (data: Message) => {
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
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chatData, chatContainerRef]);

  return (
    <ScrollArea className="h-[calc(100vh-1rem-56.8px-64.8px)] w-full px-4">
      <div ref={chatContainerRef} className="flex flex-col gap-4 py-4">
        {chatData.map((chat, index) => (
          <ChatBubble key={index} {...chat} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default Chat;
