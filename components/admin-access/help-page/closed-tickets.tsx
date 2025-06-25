import TicketsTable from "@/components/shared/help-page/tickets/tickets-table";
import {
  adminTicketsTableCols,
  ticketsTableCols,
} from "@/components/shared/help-page/tickets/tickets-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getClosedTickets } from "@/lib/ticket";
import { getOptimisticUser } from "@/lib/user";

const ClosedTickets = async () => {
  const {
    success: tickets,
    error: ticketsError,
    lastDocId,
    hasMore,
  } = await getClosedTickets(5);
  const user = await getOptimisticUser();

  if (ticketsError || !tickets) {
    return (
      <ErrorToast error={"Error fetching closed tickets: " + ticketsError} />
    );
  }

  return (
    <TicketsTable
      columns={user.role === "admin" ? adminTicketsTableCols : ticketsTableCols}
      data={tickets}
      tab="closed"
      lastDocId={lastDocId}
      hasMore={hasMore}
    />
  );
};

export default ClosedTickets;
