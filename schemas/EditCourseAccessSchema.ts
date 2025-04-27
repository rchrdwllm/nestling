import * as z from "zod";

export const EditCourseAccessSchema = z.object({
  courseId: z.string(),
  studentId: z.string(),
});
