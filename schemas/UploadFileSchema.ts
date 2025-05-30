import * as z from "zod";

export const UploadFileSchema = z.object({
  url: z.string(),
  public_id: z.string(),
  created_at: z.string(),
  asset_id: z.string(),
  secure_url: z.string(),
  type: z.string(),
  content_id: z.optional(z.string()),
  submission_id: z.optional(z.string()),
  message_id: z.optional(z.string()),
  task_id: z.optional(z.string()),
  resource_type: z.string(),
  hash: z.string(),
});
