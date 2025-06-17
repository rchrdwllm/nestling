import * as z from "zod";

export const DeleteTaskSchema = z.object({
  taskId: z.string().uuid(),
});
