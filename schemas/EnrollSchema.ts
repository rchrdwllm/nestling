import * as z from "zod";

export const EnrollSchema = z.object({
  studentId: z.string(),
  courseId: z.string(),
});
