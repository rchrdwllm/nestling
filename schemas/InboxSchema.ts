import { z } from "zod";
import { CloudinaryFile } from "@/types";

export const InboxSchema = z.object({
  id: z
    .string({
      required_error: "Message ID is required",
      invalid_type_error: "Message ID must be a string",
    })
    .uuid("Invalid message ID"),
  message: z
    .string({
      required_error: "Message is required",
      invalid_type_error: "Message must be a string",
    })
    .min(1, "Message cannot be empty"),
  senderId: z
    .string({
      required_error: "Sender ID is required",
      invalid_type_error: "Sender ID must be a string",
    })
    .uuid("Invalid sender ID"),
  receiverId: z
    .string({
      required_error: "Receiver ID is required",
      invalid_type_error: "Receiver ID must be a string",
    })
    .uuid("Invalid receiver ID"),
  channelId: z.string({
    required_error: "Channel ID is required",
    invalid_type_error: "Channel ID must be a string",
  }),
  timestamp: z
    .string({
      invalid_type_error: "Timestamp must be a string",
    })
    .optional(),
  type: z
    .enum(["text", "file"], {
      required_error: "Type is required",
      invalid_type_error: "Type must be 'text' or 'file'",
    })
    .default("text"),
  files: z
    .array(z.custom<CloudinaryFile>(), {
      invalid_type_error: "Files must be an array of CloudinaryFile objects",
    })
    .optional(),
});
