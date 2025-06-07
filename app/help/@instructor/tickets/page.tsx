import CreateTicketBtn from "@/components/shared/help-page/tickets/create-ticket-btn";
import TicketsTable from "@/components/shared/help-page/tickets/tickets-table";
import { ticketsTableCols } from "@/components/shared/help-page/tickets/tickets-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getUserTickets } from "@/lib/ticket";
import { getOptimisticUser } from "@/lib/user";

const Tickets = async () => {
  const user = await getOptimisticUser();
  const { success: tickets, error } = await getUserTickets(user.id);

  if (error || !tickets) {
    return <ErrorToast error={"Failed to fetch tickets: " + error} />;
  }

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Your tickets</h1>
          <CreateTicketBtn />
        </div>
        <hr />
      </div>
      <TicketsTable columns={ticketsTableCols} data={tickets} />
    </div>
  );
};

export default Tickets;
