import * as z from "zod";

export const UploadFileSchema = z.object({
  url: z.string(),
  public_id: z.string(),
  created_at: z.string(),
  asset_id: z.string(),
  secure_url: z.string(),
  content_id: z.string(),
  type: z.string(),
});
