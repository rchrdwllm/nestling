import TicketsTable from "@/components/shared/help-page/tickets/tickets-table";
import {
  adminTicketsTableCols,
  ticketsTableCols,
} from "@/components/shared/help-page/tickets/tickets-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getArchivedTickets } from "@/lib/ticket";
import { getOptimisticUser } from "@/lib/user";

const ArchivedTickets = async () => {
  const { success: tickets, error: ticketsError } = await getArchivedTickets();
  const user = await getOptimisticUser();

  if (ticketsError || !tickets) {
    return (
      <ErrorToast error={"Error fetching archived tickets: " + ticketsError} />
    );
  }

  return (
    <TicketsTable
      columns={user.role === "admin" ? adminTicketsTableCols : ticketsTableCols}
      data={tickets}
    />
  );
};

export default ArchivedTickets;
