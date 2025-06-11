import * as z from "zod";

export const ArchiveTaskSchema = z.object({
  taskId: z.string({
    required_error: "Task ID is required",
    invalid_type_error: "Task ID must be a string",
  }),
});
