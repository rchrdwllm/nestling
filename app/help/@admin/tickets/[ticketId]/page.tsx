import TicketDetails from "@/components/shared/help-page/tickets/ticket-details";
import ErrorToast from "@/components/ui/error-toast";
import { getTicketById } from "@/lib/ticket";
import UpdateTicketBtn from "@/components/shared/help-page/tickets/update-ticket-btn";

const TicketPage = async ({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) => {
  const { ticketId } = await params;
  const { success: ticket, error: ticketError } = await getTicketById(ticketId);

  if (ticketError || !ticket) {
    return <ErrorToast error={"Error fetching ticket: " + ticketError} />;
  }

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-3xl flex-1 font-semibold">
            Ticket: {ticket.title}
          </h1>
          <UpdateTicketBtn ticketStatus={ticket.status} ticketId={ticket.id} />
        </div>
        <hr />
      </div>
      <TicketDetails ticket={ticket} />
    </div>
  );
};

export default TicketPage;
