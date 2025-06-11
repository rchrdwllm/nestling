import * as z from "zod";

export const EnrollSchema = z.object({
  studentId: z.string({
    required_error: "Student ID is required",
    invalid_type_error: "Student ID must be a string",
  }),
  courseId: z.string({
    required_error: "Course ID is required",
    invalid_type_error: "Course ID must be a string",
  }),
});
