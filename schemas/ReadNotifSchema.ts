import * as z from "zod";

export const ReadNotifSchema = z.object({
  notifId: z.string(),
});
