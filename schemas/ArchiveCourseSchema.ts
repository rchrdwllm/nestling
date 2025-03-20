import * as z from "zod";

export const ArchiveCourseSchema = z.object({
  courseId: z.string(),
});
