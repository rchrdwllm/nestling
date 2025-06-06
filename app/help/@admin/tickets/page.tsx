import ClosedTickets from "@/components/admin-access/help-page/closed-tickets";
import InProgressTickets from "@/components/admin-access/help-page/in-progress-tickets";
import OpenTickets from "@/components/admin-access/help-page/open-tickets";
import CreateTicketBtn from "@/components/shared/help-page/tickets/create-ticket-btn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Tickets = async () => {
  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">All tickets</h1>
        </div>
        <hr />
      </div>
      <Tabs defaultValue="open" className="w-full">
        <TabsList className="w-full mb-2">
          <TabsTrigger className="w-full" value="open">
            Open tickets
          </TabsTrigger>
          <TabsTrigger className="w-full" value="in-progress">
            In progress events
          </TabsTrigger>
          <TabsTrigger className="w-full" value="closed">
            Closed tickets
          </TabsTrigger>
        </TabsList>
        <TabsContent value="open">
          <OpenTickets />
        </TabsContent>
        <TabsContent value="in-progress">
          <InProgressTickets />
        </TabsContent>
        <TabsContent value="closed">
          <ClosedTickets />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tickets;
