import * as z from "zod";

export const SendNativeNotifSchema = z.object({
  title: z.string(),
  body: z.string(),
  receiverIds: z.array(z.string()),
});
