import { z } from "zod";

export const InboxSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  senderId: z.string().uuid("Invalid sender ID"),
  receiverId: z.string().uuid("Invalid receiver ID"),
  timestamp: z.string().optional(),
});
