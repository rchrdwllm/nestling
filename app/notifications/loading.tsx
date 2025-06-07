import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import ClearAllBtn from "@/components/shared/notifications-page/clear-all-btn";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NotificationsPage = () => {
  return (
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
            <div className="flex flex-col gap-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-4 flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-[30px] w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-[14px] w-24" />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="read">
            <div className="flex flex-col gap-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-4 flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-[30px] w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-[14px] w-24" />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default NotificationsPage;
