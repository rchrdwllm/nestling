import Channel from "@/components/shared/inbox-page/channel";

const ChannelPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ channelId: string }>;
  searchParams: Promise<{ receiverId?: string }>;
}) => {
  const { channelId } = await params;
  const { receiverId } = await searchParams;

  return <Channel channelId={channelId} receiverId={receiverId} />;
};

export default ChannelPage;
