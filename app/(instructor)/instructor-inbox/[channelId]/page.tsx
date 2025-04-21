import ChatForm from "@/components/shared/inbox-page/chat-form";
import ChatWindow from "@/components/shared/inbox-page/chat-window";
import { getChannelMessages } from "@/lib/message";
import { getUserById } from "@/lib/user";

const ChannelPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ channelId: string }>;
  searchParams: Promise<{ receiverId: string }>;
}) => {
  const { channelId } = await params;
  const { receiverId } = await searchParams;
  const { success: messages, error: messagesError } = await getChannelMessages(
    channelId
  );
  const { success: receiver, error: receiverError } = await getUserById(
    receiverId
  );

  if (receiverError) {
    return (
      <main className="h-full flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-muted-foreground">{receiverError}</h1>
        </div>
        <ChatForm receiverId={receiverId} />
      </main>
    );
  }

  if (messagesError) {
    return (
      <main className="h-full flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-muted-foreground">{messagesError}</h1>
        </div>
        <ChatForm receiverId={receiverId} />
      </main>
    );
  }

  if (!messages?.length && receiver) {
    return (
      <div className="flex flex-col">
        <header className="p-4 h-[72.8px] flex items-center border-b border-border">
          <h1 className="font-semibold">Chat with {receiver.name}</h1>
        </header>
        <div className="h-[calc(100vh-1rem-72.8px-64.8px)] w-full px-4 flex justify-center items-center">
          <h1 className="text-muted-foreground">No messages yet</h1>
        </div>
        <ChatForm receiverId={receiver.id} />
      </div>
    );
  }

  return <ChatWindow messages={JSON.stringify(messages)} />;
};

export default ChannelPage;
