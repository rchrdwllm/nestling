"use client";

import { useInboxStore } from "@/context/inbox-context";
import { getUserById } from "@/lib/user";
import { User } from "@/types";
import { useEffect, useState } from "react";
import ChatForm from "./chat-form";
import Chat from "./chat";

const ChatWindow = () => {
  const { selectedUserId } = useInboxStore();
  const [receiver, setReceiver] = useState<User | null>(null);

  const fetchUser = async (userId: string) => {
    const { success, error } = await getUserById(userId);

    if (success) {
      setReceiver(success);
    } else {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      fetchUser(selectedUserId);
    } else {
      setReceiver(null);
    }
  }, [selectedUserId]);

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
      <Chat receiverId={receiver.id} />
      <ChatForm receiverId={receiver.id} />
    </div>
  );
};

export default ChatWindow;
