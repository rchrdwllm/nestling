import * as z from "zod";

export const ViewCourseSchema = z.object({
  courseId: z
    .string({
      required_error: "Course ID is required",
      invalid_type_error: "Course ID must be a string",
    })
    .min(1, "Course ID is required"),
});
