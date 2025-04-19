import { ScrollArea } from "@/components/ui/scroll-area";
import ChatBubble from "./chat-bubble";
import { useCurrentUser } from "@/hooks/use-current-user";
import { pusherClient } from "@/lib/pusher";
import { useEffect, useRef, useState } from "react";
import { Message } from "@/types";

const Chat = () => {
  const { user } = useCurrentUser();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chatData, setChatData] = useState([
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      message: "Hello! How are you?",
      senderId: user.id,
      receiverId: "user2",
      timestamp: "10:00 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      message: "I'm good, thanks! How about you?",
      senderId: "user2",
      receiverId: user.id,
      timestamp: "10:01 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      message: "Doing well, just working on a project.",
      senderId: user.id,
      receiverId: "user2",
      timestamp: "10:02 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440003",
      message: "That's great to hear!",
      senderId: "user2",
      receiverId: user.id,
      timestamp: "10:03 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440004",
      message: "What about you?",
      senderId: user.id,
      receiverId: "user2",
      timestamp: "10:04 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440005",
      message: "Just finished a meeting.",
      senderId: "user2",
      receiverId: user.id,
      timestamp: "10:05 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440006",
      message: "Sounds productive!",
      senderId: user.id,
      receiverId: "user2",
      timestamp: "10:06 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440007",
      message: "Indeed!",
      senderId: "user2",
      receiverId: user.id,
      timestamp: "10:07 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440008",
      message: "Are you free later?",
      senderId: user.id,
      receiverId: "user2",
      timestamp: "10:08 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440009",
      message: "Yes, I am. What's up?",
      senderId: "user2",
      receiverId: user.id,
      timestamp: "10:09 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-44665544000a",
      message: "Want to grab coffee?",
      senderId: user.id,
      receiverId: "user2",
      timestamp: "10:10 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-44665544000b",
      message: "Sure, sounds good!",
      senderId: "user2",
      receiverId: user.id,
      timestamp: "10:11 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-44665544000c",
      message: "Great, see you at 3 PM?",
      senderId: user.id,
      receiverId: "user2",
      timestamp: "10:12 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-44665544000d",
      message: "Perfect!",
      senderId: "user2",
      receiverId: user.id,
      timestamp: "10:13 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-44665544000e",
      message: "By the way, did you finish the report?",
      senderId: "user2",
      receiverId: user.id,
      timestamp: "10:14 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-44665544000f",
      message: "Yes, I sent it this morning.",
      senderId: user.id,
      receiverId: "user2",
      timestamp: "10:15 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440010",
      message: "Awesome, thanks!",
      senderId: "user2",
      receiverId: user.id,
      timestamp: "10:16 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440011",
      message: "No problem!",
      senderId: user.id,
      receiverId: "user2",
      timestamp: "10:17 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440012",
      message: "Do you need help with anything?",
      senderId: user.id,
      receiverId: "user2",
      timestamp: "10:18 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440013",
      message: "Not at the moment, but I'll let you know.",
      senderId: "user2",
      receiverId: user.id,
      timestamp: "10:19 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440014",
      message: "Alright, just let me know.",
      senderId: user.id,
      receiverId: "user2",
      timestamp: "10:20 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440015",
      message: "Will do!",
      senderId: "user2",
      receiverId: user.id,
      timestamp: "10:21 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440016",
      message: "Have you seen the latest updates?",
      senderId: "user2",
      receiverId: user.id,
      timestamp: "10:22 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440017",
      message: "Not yet, are they important?",
      senderId: user.id,
      receiverId: "user2",
      timestamp: "10:23 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440018",
      message: "Yes, you should check them out.",
      senderId: "user2",
      receiverId: user.id,
      timestamp: "10:24 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440019",
      message: "Alright, I'll take a look.",
      senderId: user.id,
      receiverId: "user2",
      timestamp: "10:25 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-44665544001a",
      message: "Thanks!",
      senderId: "user2",
      receiverId: user.id,
      timestamp: "10:26 AM",
    },
    {
      id: "550e8400-e29b-41d4-a716-44665544001b",
      message: "You're welcome!",
      senderId: user.id,
      receiverId: "user2",
      timestamp: "10:27 AM",
    },
  ]);

  useEffect(() => {
    pusherClient.subscribe("chat-channel");

    pusherClient.bind("new-message", (data: Message) => {
      setChatData((prev) => [...prev, data]);
    });

    return () => {
      pusherClient.unbind_all();
      pusherClient.unsubscribe("chat-channel");
    };
  }, []);

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
