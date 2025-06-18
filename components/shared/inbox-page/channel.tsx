import { getChannelMessages } from "@/lib/message";
import { getThreadByChannelId } from "@/lib/thread";
import { getOptimisticUser, getUserById } from "@/lib/user";
import ChatForm from "./chat-form";
import ChatWindow from "./chat-window";
import Link from "next/link";
import ErrorToast from "@/components/ui/error-toast";
import { Button } from "@/components/ui/button";

type ChannelProps = {
  channelId: string;
  receiverId?: string;
};

const Channel = async ({
  channelId,
  receiverId: searchReceiverId,
}: ChannelProps) => {
  const { success: thread } = await getThreadByChannelId(channelId);
  const messagesResult = await getChannelMessages(channelId);
  const currentUser = await getOptimisticUser();

  const receiverId = thread
    ? thread.userIds.find((id) => id !== currentUser.id)!
    : searchReceiverId!;
  const { success: receiver, error: receiverError } = await getUserById(
    receiverId
  );

  if (receiverError || !receiver) {
    return <ErrorToast error={"Error fetching receiver: " + receiverError} />;
  }

  const messages = messagesResult.success || [];
  const hasMore = messagesResult.hasMore || false;

  if (!messages?.length && receiver) {
    return (
      <div className="flex flex-col">
        <header className="flex items-center p-4 border-b border-border h-[72.8px]">
          <Link href={`/profile?userId=${receiver.id}`}>
            <Button className="px-0 py-0 text-foreground" variant="link">
              <h1 className="font-semibold">{receiver.name}</h1>
            </Button>
          </Link>
        </header>
        <div className="flex justify-center items-center px-4 w-full h-[calc(100vh-1rem-72.8px-64.8px)]">
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
      hasMore={hasMore}
    />
  );
};

export default Channel;
