import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthenticationEvents from "./authentication-events";
import ContentEvents from "./content-events";
import SystemEvents from "./system-events";

const UserEventLogs = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">User events log</h1>
      <Tabs defaultValue="authentication" className="w-full">
        <TabsList className="w-full mb-2">
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
