import * as z from "zod";

export const ReplyTicketSchema = z.object({
  reply: z.string().min(1, "Reply is required"),
  ticketId: z.string().min(1, "Ticket ID is required"),
});
