"use client";

import { Message, MessageWithFiles, User } from "@/types";
import ChatForm from "@/components/shared/inbox-page/chat-form";
import Chat from "@/components/shared/inbox-page/chat";

type ChatWindowProps = {
  messages: string;
  receiver: string;
};

const ChatWindow = ({ messages, receiver }: ChatWindowProps) => {
  const prevMessagesData = JSON.parse(messages) as MessageWithFiles[];
  const receiverData = JSON.parse(receiver) as User;

  if (!receiver) {
    return (
      <div className="h-full flex justify-center items-center">
        <h1 className="text-muted-foreground">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <header className="p-4 h-[72.8px] flex items-center border-b border-border">
        <h1 className="font-semibold">{receiverData.name}</h1>
      </header>
      <Chat prevMessages={prevMessagesData} receiverId={receiverData.id} />
      <ChatForm receiverId={receiverData.id} />
    </div>
  );
};

export default ChatWindow;
