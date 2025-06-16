import Channel from "@/components/shared/inbox-page/channel";
import Searcher from "@/components/shared/search/general-search/searcher";

const ChannelPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ channelId: string }>;
  searchParams: Promise<{
    receiverId?: string;
    query?: string;
    page?: string;
    tab?: string;
  }>;
}) => {
  const { channelId } = await params;
  const { receiverId, query, page, tab } = await searchParams;

  return (
    <>
      <Searcher query={query} page={page} tab={tab} />
      <Channel channelId={channelId} receiverId={receiverId} />
    </>
  );
};

export default ChannelPage;
