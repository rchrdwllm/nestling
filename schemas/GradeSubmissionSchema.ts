import * as z from "zod";

export const GradeSubmissionSchema = z.object({
  studentId: z.string({
    required_error: "Student ID is required",
    invalid_type_error: "Student ID must be a string",
  }),
  contentId: z.string({
    required_error: "Content ID is required",
    invalid_type_error: "Content ID must be a string",
  }),
  submissionId: z.string({
    required_error: "Submission ID is required",
    invalid_type_error: "Submission ID must be a string",
  }),
  grade: z
    .string({
      required_error: "Grade is required",
      invalid_type_error: "Grade must be a string",
    })
    .nonempty({ message: "Grade is required" }),
  feedback: z
    .string({
      invalid_type_error: "Feedback must be a string",
    })
    .optional(),
  regrade: z
    .boolean({
      invalid_type_error: "Regrade must be a boolean",
    })
    .optional(),
});
