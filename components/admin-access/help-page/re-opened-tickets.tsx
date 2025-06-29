import TicketsTable from "@/components/shared/help-page/tickets/tickets-table";
import {
  adminTicketsTableCols,
  ticketsTableCols,
} from "@/components/shared/help-page/tickets/tickets-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getReOpenedTickets } from "@/lib/ticket";
import { getOptimisticUser } from "@/lib/user";

const ReOpenedTickets = async () => {
  const { success: tickets, error: ticketsError } = await getReOpenedTickets();
  const user = await getOptimisticUser();

  if (ticketsError || !tickets) {
    return (
      <ErrorToast error={"Error fetching re-opened tickets: " + ticketsError} />
    );
  }

  return (
    <TicketsTable
      columns={user.role === "admin" ? adminTicketsTableCols : ticketsTableCols}
      data={tickets}
    />
  );
};

export default ReOpenedTickets;
