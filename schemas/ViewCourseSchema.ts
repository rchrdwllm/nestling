import * as z from "zod";

export const ViewCourseSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
});
