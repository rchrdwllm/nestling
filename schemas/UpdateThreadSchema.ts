import * as z from "zod";

export const UpdateThreadSchema = z.object({
  threadId: z.string({
    required_error: "Thread ID is required",
    invalid_type_error: "Thread ID must be a string",
  }),
  updatedAt: z.date({
    required_error: "Updated at is required",
    invalid_type_error: "Updated at must be a date",
  }),
});
