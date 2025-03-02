import * as z from "zod";

export const DeleteFileSchema = z.object({
  public_id: z.string(),
});
