import * as z from "zod";

export const ArchiveProjectSchema = z.object({
  projectId: z.string(),
});
