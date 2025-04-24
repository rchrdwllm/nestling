import * as z from "zod";

export const UpdateThreadSchema = z.object({
  threadId: z.string(),
  updatedAt: z.date(),
});
