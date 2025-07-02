import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthenticationEvents from "./authentication-events";
import ContentEvents from "./content-events";
import SystemEvents from "./system-events";

const UserEventLogs = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-3xl">Event Logs</h1>
        <hr />
      </div>
      <Tabs defaultValue="authentication" className="w-full">
        <TabsList className="mb-2 w-full">
          <TabsTrigger className="w-full" value="authentication">
            Authentication events
          </TabsTrigger>
          <TabsTrigger className="w-full" value="content">
            Content interaction events
          </TabsTrigger>
          <TabsTrigger className="w-full" value="system">
            System interaction events
          </TabsTrigger>
        </TabsList>
        <TabsContent value="authentication">
          <AuthenticationEvents />
        </TabsContent>
        <TabsContent value="content">
          <ContentEvents />
        </TabsContent>
        <TabsContent value="system">
          <SystemEvents />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserEventLogs;
