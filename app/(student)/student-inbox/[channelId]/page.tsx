import ChatWindow from "@/components/shared/inbox-page/chat-window";
import { getChannelMessages } from "@/lib/message";

const ChannelPage = async ({
  params,
}: {
  params: Promise<{ channelId: string }>;
}) => {
  const { channelId } = await params;
  const { success: messages, error } = await getChannelMessages(channelId);

  if (error) {
    return (
      <div className="h-full flex justify-center items-center">
        <h1 className="text-muted-foreground">{error}</h1>
      </div>
    );
  }

  return <ChatWindow messages={JSON.stringify(messages)} />;
};

export default ChannelPage;
