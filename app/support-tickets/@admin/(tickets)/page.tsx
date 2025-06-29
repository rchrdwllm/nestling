import ArchivedTickets from "@/components/admin-access/help-page/archived-tickets";
import ClosedTickets from "@/components/admin-access/help-page/closed-tickets";
import InProgressTickets from "@/components/admin-access/help-page/in-progress-tickets";
import OpenTickets from "@/components/admin-access/help-page/open-tickets";
import ReOpenedTickets from "@/components/admin-access/help-page/re-opened-tickets";
import Searcher from "@/components/shared/search/general-search/searcher";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Unauthorized from "@/components/ui/unauthorized";
import { getOptimisticUser } from "@/lib/user";

const Tickets = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};
  const user = await getOptimisticUser();

  if (user.role !== "admin") return <Unauthorized />;

  return (
    <div className="flex flex-col gap-8 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-3xl">All tickets</h1>
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
          <TabsTrigger className="w-full" value="re-opened">
            Re-opened tickets
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
        <TabsContent value="re-opened">
          <ReOpenedTickets />
        </TabsContent>
        <TabsContent value="archived">
          <ArchivedTickets />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tickets;
