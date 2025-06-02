import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthenticationEvents from "./authentication-events";

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
          Make changes to your content interaction here.
        </TabsContent>
        <TabsContent value="system">
          Make changes to your system interaction here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserEventLogs;
