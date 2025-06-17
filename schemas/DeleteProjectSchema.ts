import * as z from "zod";

export const DeleteProjectSchema = z.object({
  projectId: z.string().uuid(),
});
