"use client";

import { getUserById } from "@/lib/user";
import { Message, User } from "@/types";
import { useEffect, useState } from "react";
import ChatForm from "@/components/shared/inbox-page/chat-form";
import Chat from "@/components/shared/inbox-page/chat";
import { useSearchParams } from "next/navigation";

type ChatWindowProps = {
  messages: string;
};

const ChatWindow = ({ messages }: ChatWindowProps) => {
  const [receiver, setReceiver] = useState<User | null>(null);
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const prevMessagesData = JSON.parse(messages) as Message[];

  useEffect(() => {
    if (receiverId) {
      fetchUser(receiverId);
    }
  }, [receiverId]);

  const fetchUser = async (userId: string) => {
    const { success, error } = await getUserById(userId);

    if (success) {
      setReceiver(success);
    } else {
      console.error("Error fetching user:", error);
    }
  };

  if (!receiver) {
    return (
      <div className="h-full flex justify-center items-center">
        <h1 className="text-muted-foreground">Start chatting with someone</h1>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <header className="p-4 border-b border-border">
        <h1 className="font-semibold">Chat with {receiver.name}</h1>
      </header>
      <Chat prevMessages={prevMessagesData} receiverId={receiver.id} />
      <ChatForm receiverId={receiver.id} />
    </div>
  );
};

export default ChatWindow;
