import TicketsTable from "@/components/shared/help-page/tickets/tickets-table";
import {
  adminTicketsTableCols,
  ticketsTableCols,
} from "@/components/shared/help-page/tickets/tickets-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getOpenTickets, getOpenUserTickets } from "@/lib/ticket";
import { getOptimisticUser } from "@/lib/user";

const OpenTickets = async () => {
  const user = await getOptimisticUser();
  const {
    success: tickets,
    error: ticketsError,
    lastDocId,
    hasMore,
  } = await getOpenUserTickets(user.id, 5);

  if (ticketsError || !tickets) {
    return (
      <ErrorToast error={"Error fetching open tickets: " + ticketsError} />
    );
  }

  return (
    <TicketsTable
      columns={user.role === "admin" ? adminTicketsTableCols : ticketsTableCols}
      data={tickets}
      lastDocId={lastDocId}
      hasMore={hasMore}
      tab="open"
    />
  );
};

export default OpenTickets;
