import * as z from "zod";

export const CreateContentSchema = z.object({
  type: z.enum(["lesson", "assignment", "file"], {
    required_error: "Type is required",
    invalid_type_error: "Type must be one of: lesson, assignment, file",
  }),
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
  moduleId: z.string({
    required_error: "Module ID is required",
    invalid_type_error: "Module ID must be a string",
  }),
  courseId: z.string({
    required_error: "Course ID is required",
    invalid_type_error: "Course ID must be a string",
  }),
  isPublished: z.boolean({
    required_error: "isPublished is required",
    invalid_type_error: "isPublished must be a boolean",
  }),
  content: z
    .string({
      invalid_type_error: "Content must be a string",
    })
    .optional(),
  points: z
    .number({
      invalid_type_error: "Points must be a number",
    })
    .optional(),
  date: z
    .object({
      from: z
        .date({
          invalid_type_error: "From date must be a valid date",
        })
        .optional(),
      to: z
        .date({
          invalid_type_error: "To date must be a valid date",
        })
        .optional(),
    })
    .optional(),
  maxAttempts: z
    .number({
      invalid_type_error: "Max attempts must be a number",
    })
    .optional(),
  submissionType: z
    .enum(["text", "pdf", "docx", "xlsx", "pptx", "mp4", "other"], {
      invalid_type_error:
        "Submission type must be one of: text, pdf, docx, xlsx, pptx, mp4, other",
    })
    .optional(),
  id: z.string({
    required_error: "ID is required",
    invalid_type_error: "ID must be a string",
  }),
  fileUrl: z
    .string({
      invalid_type_error: "File URL must be a string",
    })
    .optional(),
  isEdit: z.boolean({
    required_error: "isEdit is required",
    invalid_type_error: "isEdit must be a boolean",
  }),
});
