import TicketsTable from "@/components/shared/help-page/tickets/tickets-table";
import {
  adminTicketsTableCols,
  ticketsTableCols,
} from "@/components/shared/help-page/tickets/tickets-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getArchivedUserTickets } from "@/lib/ticket";
import { getOptimisticUser } from "@/lib/user";

const ArchivedTickets = async () => {
  const user = await getOptimisticUser();
  const {
    success: tickets,
    error: ticketsError,
    lastDocId,
    hasMore,
  } = await getArchivedUserTickets(user.id, 5);

  if (ticketsError || !tickets) {
    return (
      <ErrorToast error={"Error fetching archived tickets: " + ticketsError} />
    );
  }

  return (
    <TicketsTable
      columns={user.role === "admin" ? adminTicketsTableCols : ticketsTableCols}
      data={tickets}
      tab="archived"
      lastDocId={lastDocId}
      hasMore={hasMore}
    />
  );
};

export default ArchivedTickets;
