import { getOptimisticUser, getUserById } from "@/lib/user";
import { Thread } from "@/types";
import Link from "next/link";
import ThreadCardWrapper from "./thread-card-wrapper";
import { getLatestMessage } from "@/lib/message";
import ErrorToast from "@/components/ui/error-toast";

const ThreadCard = async ({ userIds, channelId }: Thread) => {
  const user = await getOptimisticUser();
  const receiverId = userIds.find((id) => id !== user.id)!;
  const { success: receiver, error: receiverError } = await getUserById(
    receiverId
  );
  const { success: latestMessage } = await getLatestMessage(channelId);

  if (receiverError || !receiver) {
    return (
      <ErrorToast
        error={"Failed to load thread: " + (receiverError || "Unknown error")}
      />
    );
  }

  return (
    <Link href={`/inbox/${channelId}`}>
      <ThreadCardWrapper channelId={channelId}>
        <h1 className="font-medium text-inherit">{receiver.name}</h1>
        {latestMessage && (
          <p className="max-w-[90%] text-muted-foreground text-sm truncate">
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
