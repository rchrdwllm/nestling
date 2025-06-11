import * as z from "zod";

export const DeleteAllNotifSchema = z.object({
  userId: z
    .string({
      required_error: "User ID is required",
      invalid_type_error: "User ID must be a string",
    })
    .min(1, "User ID is required"),
});
