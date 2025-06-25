import TicketsTable from "@/components/shared/help-page/tickets/tickets-table";
import {
  adminTicketsTableCols,
  ticketsTableCols,
} from "@/components/shared/help-page/tickets/tickets-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getClosedUserTickets } from "@/lib/ticket";
import { getOptimisticUser } from "@/lib/user";

const ClosedTickets = async () => {
  const user = await getOptimisticUser();
  const {
    success: tickets,
    error: ticketsError,
    lastDocId,
    hasMore,
  } = await getClosedUserTickets(user.id, 5);

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
