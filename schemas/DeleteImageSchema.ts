import * as z from "zod";

export const DeleteImageSchema = z.object({
  public_id: z.string(),
});
