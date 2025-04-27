import { z } from "zod";
import { CloudinaryFile } from "@/types";

export const InboxSchema = z.object({
  id: z.string().uuid("Invalid message ID"),
  message: z.string().min(1, "Message cannot be empty"),
  senderId: z.string().uuid("Invalid sender ID"),
  receiverId: z.string().uuid("Invalid receiver ID"),
  channelId: z.string(),
  timestamp: z.string().optional(),
  type: z.enum(["text", "file"]).default("text"),
  files: z.array(z.custom<CloudinaryFile>()).optional(),
});
