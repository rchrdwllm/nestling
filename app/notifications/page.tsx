import ClearAllBtn from "@/components/shared/notifications-page/clear-all-btn";
import ReadNotifs from "@/components/shared/notifications-page/read-notifs";
import UnreadNotifs from "@/components/shared/notifications-page/unread-notifs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";

const NotificationsPage = () => {
  return (
    <FadeInWrapper>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">Notifications</h1>
          <hr />
        </div>
        <section>
          <Tabs defaultValue="unread" className="w-full">
            <div className="flex items-center justify-between mb-4">
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
