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
  hasMore?: boolean;
};

const ChatWindow = ({
  messages,
  receiver,
  hasMore = true,
}: ChatWindowProps) => {
  const prevMessagesData = JSON.parse(messages) as MessageWithFiles[];
  const receiverData = JSON.parse(receiver) as User;

  if (!receiver) {
    return <ErrorToast error={"Error fetching receiver data"} />;
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center p-4 border-b border-border h-[72.8px]">
        <Link href={`/profile?userId=${receiverData.id}`}>
          <Button className="px-0 py-0 text-foreground" variant="link">
            <h1 className="font-semibold">{receiverData.name}</h1>
          </Button>
        </Link>
      </header>
      <Chat
        prevMessages={prevMessagesData}
        receiverId={receiverData.id}
        hasMore={hasMore}
      />
      <ChatForm receiverId={receiverData.id} />
    </div>
  );
};

export default ChatWindow;
