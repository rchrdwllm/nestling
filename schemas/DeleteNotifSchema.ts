import * as z from "zod";

export const DeleteNotifSchema = z.object({
  notificationId: z.string({
    required_error: "Notification ID is required",
    invalid_type_error: "Notification ID must be a string",
  }),
});
