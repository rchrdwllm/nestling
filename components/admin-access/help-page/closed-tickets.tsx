import TicketsTable from "@/components/shared/help-page/tickets/tickets-table";
import { ticketsTableCols } from "@/components/shared/help-page/tickets/tickets-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getClosedTickets } from "@/lib/ticket";

const ClosedTickets = async () => {
  const { success: tickets, error: ticketsError } = await getClosedTickets();

  if (ticketsError || !tickets) {
    return (
      <ErrorToast error={"Error fetching closed tickets: " + ticketsError} />
    );
  }

  return <TicketsTable columns={ticketsTableCols} data={tickets} />;
};

export default ClosedTickets;
