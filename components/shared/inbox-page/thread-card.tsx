import { getOptimisticUser, getUserById } from "@/lib/user";
import { Thread } from "@/types";
import Link from "next/link";
import ThreadCardWrapper from "./thread-card-wrapper";
import { getLatestMessage } from "@/lib/message";

const ThreadCard = async ({ userIds, channelId }: Thread) => {
  const user = await getOptimisticUser();
  const receiverId = userIds.find((id) => id !== user.id)!;
  const { success: receiver, error: receiverError } = await getUserById(
    receiverId
  );
  const { success: latestMessage } = await getLatestMessage(channelId);

  if (receiverError) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <h1 className="text-muted-foreground">
          {JSON.stringify(receiverError)}
        </h1>
      </div>
    );
  }

  if (!receiver) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <h1 className="text-muted-foreground">No receiver available</h1>
      </div>
    );
  }

  return (
    <Link href={`/${user.role}-inbox/${channelId}`}>
      <ThreadCardWrapper channelId={channelId}>
        <h1 className="font-medium text-inherit">{receiver.name}</h1>
        {latestMessage && (
          <p className="text-sm text-muted-foreground truncate max-w-[90%]">
            {latestMessage.senderId === user.id
              ? `You: ${latestMessage.message}`
              : latestMessage.message}
          </p>
        )}
      </ThreadCardWrapper>
    </Link>
  );
};

export default ThreadCard;
