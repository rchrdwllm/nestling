import * as z from "zod";

export const ArchiveModuleSchema = z.object({
  moduleId: z.string({
    required_error: "Module ID is required",
    invalid_type_error: "Module ID must be a string",
  }),
  courseId: z.string({
    required_error: "Course ID is required",
    invalid_type_error: "Course ID must be a string",
  }),
});
