import ClearAllBtn from "@/components/shared/notifications-page/clear-all-btn";
import ReadNotifs from "@/components/shared/notifications-page/read-notifs";
import UnreadNotifs from "@/components/shared/notifications-page/unread-notifs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import Searcher from "@/components/shared/search/general-search/searcher";

const NotificationsPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};
  return (
    <FadeInWrapper>
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-3xl">Notifications</h1>
          <hr />
        </div>
        <section>
          <Tabs defaultValue="unread" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="w-96">
                <TabsTrigger className="w-full" value="unread">
                  Unread
                </TabsTrigger>
                <TabsTrigger className="w-full" value="read">
                  Read
                </TabsTrigger>
              </TabsList>
              <ClearAllBtn />
            </div>
            <TabsContent value="unread">
              <UnreadNotifs />
            </TabsContent>
            <TabsContent value="read">
              <ReadNotifs />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </FadeInWrapper>
  );
};

export default NotificationsPage;
