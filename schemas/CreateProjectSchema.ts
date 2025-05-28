import * as z from "zod";

export const CreateProjectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.enum(["planned", "in-progress", "completed"]),
  projectHeads: z
    .array(z.string())
    .min(1, "At least one project head is required"),
  projectAssociates: z.array(z.string()).optional(),
  isEdit: z.boolean().default(false),
  projectId: z.string().optional(),
});
