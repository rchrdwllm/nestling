import { getOptimisticUser, getUserById } from "@/lib/user";
import { Thread } from "@/types";
import Link from "next/link";

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
      <div className="h-auto p-4 border-b border-border cursor-pointer transition-colors hover:bg-secondary">
        <h1 className="font-medium text-foreground">{recipient.name}</h1>
      </div>
    </Link>
  );
};

export default ThreadCard;
