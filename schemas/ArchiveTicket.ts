import * as z from "zod";

export const ArchiveTicketSchema = z.object({
  ticketId: z.string({
    required_error: "Ticket ID is required",
    invalid_type_error: "Ticket ID must be a string",
  }),
});
