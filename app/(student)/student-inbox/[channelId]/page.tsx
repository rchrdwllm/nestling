import Channel from "@/components/shared/inbox-page/channel";
import ChatForm from "@/components/shared/inbox-page/chat-form";
import ChatWindow from "@/components/shared/inbox-page/chat-window";
import { getChannelMessages } from "@/lib/message";
import { getThreadByChannelId } from "@/lib/thread";
import { getOptimisticUser, getUserById } from "@/lib/user";
import { Suspense } from "react";

const ChannelPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ channelId: string }>;
  searchParams: Promise<{ receiverId?: string }>;
}) => {
  const { channelId } = await params;
  const { receiverId } = await searchParams;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Channel channelId={channelId} receiverId={receiverId} />
    </Suspense>
  );
};

export default ChannelPage;
