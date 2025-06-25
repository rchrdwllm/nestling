import CreateTicketBtn from "@/components/shared/help-page/tickets/create-ticket-btn";
import Searcher from "@/components/shared/search/general-search/searcher";
import ArchivedTickets from "@/components/student-access/support-tickets-page/archived-tickets";
import ClosedTickets from "@/components/student-access/support-tickets-page/closed-tickets";
import InProgressTickets from "@/components/student-access/support-tickets-page/in-progress-tickets";
import OpenTickets from "@/components/student-access/support-tickets-page/open-tickets";
import ErrorToast from "@/components/ui/error-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Unauthorized from "@/components/ui/unauthorized";
import { getOpenUserTickets } from "@/lib/ticket";
import { getOptimisticUser } from "@/lib/user";

const Tickets = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};
  const user = await getOptimisticUser();

  if (user.role !== "student") return <Unauthorized />;

  const { success: tickets, error } = await getOpenUserTickets(user.id);

  if (error || !tickets) {
    return <ErrorToast error={"Failed to fetch tickets: " + error} />;
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-3xl">Your tickets</h1>
          <CreateTicketBtn />
        </div>
        <hr />
      </div>
      <Tabs defaultValue="open" className="w-full">
        <TabsList className="mb-2 w-full">
          <TabsTrigger className="w-full" value="open">
            Open tickets
          </TabsTrigger>
          <TabsTrigger className="w-full" value="in-progress">
            In progress tickets
          </TabsTrigger>
          <TabsTrigger className="w-full" value="closed">
            Closed tickets
          </TabsTrigger>
          <TabsTrigger className="w-full" value="archived">
            Archived tickets
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
        <TabsContent value="archived">
          <ArchivedTickets />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tickets;
