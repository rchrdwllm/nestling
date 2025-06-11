import * as z from "zod";

export const UpdateTicketSchema = z.object({
  ticketId: z
    .string({
      required_error: "Ticket ID is required",
      invalid_type_error: "Ticket ID must be a string",
    })
    .min(1, "Ticket ID is required"),
  status: z.enum(["open", "in-progress", "closed"], {
    required_error: "Status is required",
    invalid_type_error: "Status must be one of: open, in-progress, closed",
  }),
});
