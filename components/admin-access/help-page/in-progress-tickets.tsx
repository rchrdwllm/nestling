import TicketsTable from "@/components/shared/help-page/tickets/tickets-table";
import { ticketsTableCols } from "@/components/shared/help-page/tickets/tickets-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getInProgressTickets } from "@/lib/ticket";

const InProgressTickets = async () => {
  const { success: tickets, error: ticketsError } =
    await getInProgressTickets();

  if (ticketsError || !tickets) {
    return (
      <ErrorToast
        error={"Error fetching in-progress tickets: " + ticketsError}
      />
    );
  }

  return <TicketsTable columns={ticketsTableCols} data={tickets} />;
};

export default InProgressTickets;
