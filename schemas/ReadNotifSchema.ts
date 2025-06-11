import * as z from "zod";

export const ReadNotifSchema = z.object({
  notifId: z.string({
    required_error: "Notification ID is required",
    invalid_type_error: "Notification ID must be a string",
  }),
});
