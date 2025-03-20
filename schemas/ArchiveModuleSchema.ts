import * as z from "zod";

export const ArchiveModuleSchema = z.object({
  moduleId: z.string(),
  courseId: z.string(),
});
