import TicketsTable from "@/components/shared/help-page/tickets/tickets-table";
import { ticketsTableCols } from "@/components/shared/help-page/tickets/tickets-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getOpenTickets } from "@/lib/ticket";

const OpenTickets = async () => {
  const { success: tickets, error: ticketsError } = await getOpenTickets();

  if (ticketsError || !tickets) {
    return (
      <ErrorToast error={"Error fetching open tickets: " + ticketsError} />
    );
  }

  return <TicketsTable columns={ticketsTableCols} data={tickets} />;
};

export default OpenTickets;
