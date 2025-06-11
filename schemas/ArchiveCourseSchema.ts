import * as z from "zod";

export const ArchiveCourseSchema = z.object({
  courseId: z.string({
    required_error: "Course ID is required",
    invalid_type_error: "Course ID must be a string",
  }),
});
