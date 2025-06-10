"use client";

import { Message, MessageWithFiles, User } from "@/types";
import ChatForm from "@/components/shared/inbox-page/chat-form";
import Chat from "@/components/shared/inbox-page/chat";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ErrorToast from "@/components/ui/error-toast";

type ChatWindowProps = {
  messages: string;
  receiver: string;
};

const ChatWindow = ({ messages, receiver }: ChatWindowProps) => {
  const prevMessagesData = JSON.parse(messages) as MessageWithFiles[];
  const receiverData = JSON.parse(receiver) as User;

  if (!receiver) {
    return <ErrorToast error={"Error fetching receiver data"} />;
  }

  return (
    <div className="h-full flex flex-col">
      <header className="p-4 h-[72.8px] flex items-center border-b border-border">
        <Link href={`/profile?userId=${receiverData.id}`}>
          <Button className="text-foreground px-0 py-0" variant="link">
            <h1 className="font-semibold">{receiverData.name}</h1>
          </Button>
        </Link>
      </header>
      <Chat prevMessages={prevMessagesData} receiverId={receiverData.id} />
      <ChatForm receiverId={receiverData.id} />
    </div>
  );
};

export default ChatWindow;
