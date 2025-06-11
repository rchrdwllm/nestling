import * as z from "zod";

export const RemoveFromCourseSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
});
