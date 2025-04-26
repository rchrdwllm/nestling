import { getChannelMessages } from "@/lib/message";
import { getThreadByChannelId } from "@/lib/thread";
import { getOptimisticUser, getUserById } from "@/lib/user";
import ChatForm from "./chat-form";
import ChatWindow from "./chat-window";

type ChannelProps = {
  channelId: string;
  receiverId?: string;
};

const Channel = async ({
  channelId,
  receiverId: searchReceiverId,
}: ChannelProps) => {
  const { success: thread } = await getThreadByChannelId(channelId);
  const { success: messages, error: messagesError } = await getChannelMessages(
    channelId
  );
  const currentUser = await getOptimisticUser();

  const receiverId = thread
    ? thread.userIds.find((id) => id !== currentUser.id)!
    : searchReceiverId!;
  const { success: receiver, error: receiverError } = await getUserById(
    receiverId
  );

  if (receiverError) {
    return (
      <main className="h-full flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-muted-foreground">
            {JSON.stringify(receiverError)}
          </h1>
        </div>
      </main>
    );
  }

  if (!receiver) {
    return (
      <main className="h-full flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-muted-foreground">No receiver found</h1>
        </div>
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

  return (
    <ChatWindow
      messages={JSON.stringify(messages)}
      receiver={JSON.stringify(receiver)}
    />
  );
};

export default Channel;
