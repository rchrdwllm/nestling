import * as z from "zod";

export const CreateModuleSchema = z.object({
  title: z
    .string({
      required_error: "Module title is required",
      invalid_type_error: "Module title must be a string",
    })
    .min(3, { message: "Module title must be at least 3 characters long" }),
  courseId: z.string({
    required_error: "Course ID is required",
    invalid_type_error: "Course ID must be a string",
  }),
  isEdit: z
    .boolean({
      invalid_type_error: "isEdit must be a boolean",
    })
    .optional(),
  moduleId: z
    .string({
      invalid_type_error: "Module ID must be a string",
    })
    .optional(),
  pathname: z
    .string({
      invalid_type_error: "Pathname must be a string",
    })
    .optional(),
});
