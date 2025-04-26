import Channel from "@/components/shared/inbox-page/channel";
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
