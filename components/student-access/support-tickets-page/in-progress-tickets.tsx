import TicketsTable from "@/components/shared/help-page/tickets/tickets-table";
import {
  adminTicketsTableCols,
  ticketsTableCols,
} from "@/components/shared/help-page/tickets/tickets-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getInProgressTickets, getInProgressUserTickets } from "@/lib/ticket";
import { getOptimisticUser } from "@/lib/user";

const InProgressTickets = async () => {
  const user = await getOptimisticUser();
  const {
    success: tickets,
    error: ticketsError,
    lastDocId,
    hasMore,
  } = await getInProgressUserTickets(user.id, 5);

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
      tab="in-progress"
      lastDocId={lastDocId}
      hasMore={hasMore}
    />
  );
};

export default InProgressTickets;
