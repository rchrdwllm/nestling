import { getOptimisticUser, getUserById } from "@/lib/user";
import { Thread } from "@/types";
import Link from "next/link";
import ThreadCardWrapper from "./thread-card-wrapper";

const ThreadCard = async ({ userIds, channelId }: Thread) => {
  const user = await getOptimisticUser();
  const recipientId = userIds.find((id) => id !== user.id)!;
  const { success: recipient, error } = await getUserById(recipientId);

  if (error) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <h1 className="text-muted-foreground">{JSON.stringify(error)}</h1>
      </div>
    );
  }

  if (!recipient) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <h1 className="text-muted-foreground">No recipient available</h1>
      </div>
    );
  }

  return (
    <Link href={`/${user.role}-inbox/${channelId}`}>
      <ThreadCardWrapper channelId={channelId}>
        <h1 className="font-medium text-inherit">{recipient.name}</h1>
      </ThreadCardWrapper>
    </Link>
  );
};

export default ThreadCard;
