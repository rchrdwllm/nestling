import * as z from "zod";

export const UpdateNotifPrefSchema = z.object({
  userId: z.string({
    required_error: "User ID is required",
    invalid_type_error: "User ID must be a string",
  }),
});
