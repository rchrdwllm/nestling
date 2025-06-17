import * as z from "zod";

export const DeleteDiscussionSchema = z.object({
  discussionId: z
    .string({
      required_error: "ID is required",
      invalid_type_error: "ID must be a string",
    })
    .min(1, { message: "ID is required" }),
});
