import * as z from "zod";

export const CreateNotifSchema = z.object({
  type: z.string(),
  title: z.string(),
  message: z.string(),
  url: z.string(),
  senderId: z.string(),
  receiverIds: z.array(z.string()).optional(),
});
