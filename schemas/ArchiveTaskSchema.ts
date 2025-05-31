import * as z from "zod";

export const ArchiveTaskSchema = z.object({
  taskId: z.string(),
});
