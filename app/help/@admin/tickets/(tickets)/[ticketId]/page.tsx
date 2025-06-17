import TicketDetails from "@/components/shared/help-page/tickets/ticket-details";
import ErrorToast from "@/components/ui/error-toast";
import { getTicketById } from "@/lib/ticket";
import UpdateTicketBtn from "@/components/shared/help-page/tickets/update-ticket-btn";
import CreateReplyBtn from "@/components/shared/help-page/tickets/create-reply-btn";
import { getTicketReplies } from "@/lib/ticket-reply";
import TicketReplyCard from "@/components/shared/help-page/tickets/ticket-reply-card";
import Searcher from "@/components/shared/search/general-search/searcher";

const TicketPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ ticketId: string }>;
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { ticketId } = await params;
  const { query, page, tab } = (await searchParams) || {};
  const { success: ticket, error: ticketError } = await getTicketById(ticketId);

  if (ticketError || !ticket) {
    return <ErrorToast error={"Error fetching ticket: " + ticketError} />;
  }

  const { success: ticketReplies, error: repliesError } =
    await getTicketReplies(ticketId);

  if (repliesError || !ticketReplies) {
    return (
      <ErrorToast error={"Error fetching ticket replies: " + repliesError} />
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <h1 className="flex-1 font-semibold text-3xl">
            Ticket: {ticket.title}
          </h1>
          <UpdateTicketBtn ticketStatus={ticket.status} ticketId={ticket.id} />
        </div>
        <hr />
      </div>
      <section className="flex flex-col gap-4">
        <TicketDetails ticket={ticket} />
        {!ticketReplies.length
          ? null
          : ticketReplies.map((reply) => (
              <TicketReplyCard key={reply.id} {...reply} />
            ))}
        {ticket.status !== "closed" && <CreateReplyBtn ticketId={ticket.id} />}
        {ticket.status === "closed" && (
          <p className="py-20 text-muted-foreground text-sm text-center">
            This ticket has been closed
          </p>
        )}
        {!ticketReplies.length && ticket.status !== "closed" && (
          <p className="py-20 text-muted-foreground text-sm text-center">
            No replies yet
          </p>
        )}
      </section>
    </div>
  );
};

export default TicketPage;
