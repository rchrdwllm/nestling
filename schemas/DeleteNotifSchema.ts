import * as z from "zod";

export const DeleteNotifSchema = z.object({
  notificationId: z.string(),
});
