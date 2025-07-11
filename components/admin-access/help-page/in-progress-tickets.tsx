import TicketsTable from "@/components/shared/help-page/tickets/tickets-table";
import {
  adminTicketsTableCols,
  ticketsTableCols,
} from "@/components/shared/help-page/tickets/tickets-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getInProgressTickets } from "@/lib/ticket";
import { getOptimisticUser } from "@/lib/user";

const InProgressTickets = async () => {
  const { success: tickets, error: ticketsError } =
    await getInProgressTickets();
  const user = await getOptimisticUser();

  if (ticketsError || !tickets) {
    return (
      <ErrorToast
        error={"Error fetching in-progress tickets: " + ticketsError}
      />
    );
  }

  return (
    <TicketsTable
      columns={user.role === "admin" ? adminTicketsTableCols : ticketsTableCols}
      data={tickets}
    />
  );
};

export default InProgressTickets;
