import * as z from "zod";

export const DeleteImageSchema = z.object({
  public_id: z.string({
    required_error: "Public ID is required",
    invalid_type_error: "Public ID must be a string",
  }),
});
