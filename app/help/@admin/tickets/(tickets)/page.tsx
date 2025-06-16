import ClosedTickets from "@/components/admin-access/help-page/closed-tickets";
import InProgressTickets from "@/components/admin-access/help-page/in-progress-tickets";
import OpenTickets from "@/components/admin-access/help-page/open-tickets";
import Searcher from "@/components/shared/search/general-search/searcher";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Tickets = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};

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
