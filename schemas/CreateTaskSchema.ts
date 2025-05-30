import * as z from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().min(1, "Take title is required"),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.enum(["planned", "in-progress", "completed"]),
  priority: z.enum(["low", "medium", "high"]),
  assignees: z.array(z.string()).optional(),
  projectId: z.string(),
  isEdit: z.boolean().optional(),
  taskId: z.string().optional(),
});
