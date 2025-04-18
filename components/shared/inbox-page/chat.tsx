import { ScrollArea } from "@/components/ui/scroll-area";
import ChatBubble from "./chat-bubble";
import { useCurrentUser } from "@/hooks/use-current-user";
import { pusherClient } from "@/lib/pusher";
import { useEffect, useState } from "react";
import { Message } from "@/types";

const Chat = () => {
  const { user } = useCurrentUser();
  const [chatData, setChatData] = useState([
    { message: "Hello! How are you?", sender: user.id, timestamp: "10:00 AM" },
    {
      message: "I'm good, thanks! How about you?",
      sender: "user2",
      timestamp: "10:01 AM",
    },
    {
      message: "Doing well, just working on a project.",
      sender: user.id,
      timestamp: "10:02 AM",
    },
    {
      message: "That's great to hear!",
      sender: "user2",
      timestamp: "10:03 AM",
    },
    { message: "What about you?", sender: user.id, timestamp: "10:04 AM" },
    {
      message: "Just finished a meeting.",
      sender: "user2",
      timestamp: "10:05 AM",
    },
    { message: "Sounds productive!", sender: user.id, timestamp: "10:06 AM" },
    { message: "Indeed!", sender: "user2", timestamp: "10:07 AM" },
    { message: "Are you free later?", sender: user.id, timestamp: "10:08 AM" },
    {
      message: "Yes, I am. What's up?",
      sender: "user2",
      timestamp: "10:09 AM",
    },
    { message: "Want to grab coffee?", sender: user.id, timestamp: "10:10 AM" },
    { message: "Sure, sounds good!", sender: "user2", timestamp: "10:11 AM" },
    {
      message: "Great, see you at 3 PM?",
      sender: user.id,
      timestamp: "10:12 AM",
    },
    { message: "Perfect!", sender: "user2", timestamp: "10:13 AM" },
    {
      message: "By the way, did you finish the report?",
      sender: "user2",
      timestamp: "10:14 AM",
    },
    {
      message: "Yes, I sent it this morning.",
      sender: user.id,
      timestamp: "10:15 AM",
    },
    { message: "Awesome, thanks!", sender: "user2", timestamp: "10:16 AM" },
    { message: "No problem!", sender: user.id, timestamp: "10:17 AM" },
    {
      message: "Do you need help with anything?",
      sender: user.id,
      timestamp: "10:18 AM",
    },
    {
      message: "Not at the moment, but I'll let you know.",
      sender: "user2",
      timestamp: "10:19 AM",
    },
    {
      message: "Alright, just let me know.",
      sender: user.id,
      timestamp: "10:20 AM",
    },
    { message: "Will do!", sender: "user2", timestamp: "10:21 AM" },
    {
      message: "Have you seen the latest updates?",
      sender: "user2",
      timestamp: "10:22 AM",
    },
    {
      message: "Not yet, are they important?",
      sender: user.id,
      timestamp: "10:23 AM",
    },
    {
      message: "Yes, you should check them out.",
      sender: "user2",
      timestamp: "10:24 AM",
    },
    {
      message: "Alright, I'll take a look.",
      sender: user.id,
      timestamp: "10:25 AM",
    },
    { message: "Thanks!", sender: "user2", timestamp: "10:26 AM" },
    { message: "You're welcome!", sender: user.id, timestamp: "10:27 AM" },
  ]);

  useEffect(() => {
    const channel = pusherClient.subscribe("chat-channel");

    channel.bind("new-message", (data: Message) => {
      console.log("Received new-message event with data:", data);
      console.log(data);
      setChatData((prev) => [...prev, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log(chatData);
  }, [chatData]);

  return (
    <ScrollArea className="h-[calc(100vh-1rem-56.8px-64.8px)] w-full px-4">
      <div className="flex flex-col gap-4 py-4">
        {chatData.map((chat, index) => (
          <ChatBubble
            key={index}
            message={chat.message}
            sender={chat.sender}
            timestamp={chat.timestamp}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default Chat;
