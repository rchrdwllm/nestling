import * as z from "zod";

export const UpdateNotifPrefSchema = z.object({
  userId: z.string(),
});
