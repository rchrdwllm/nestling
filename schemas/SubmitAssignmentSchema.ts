import * as z from "zod";

export const SubmitAssignmentSchema = z.object({
  content: z.string({
    required_error: "Content is required",
    invalid_type_error: "Content must be a string",
  }),
  submissionType: z.string({
    required_error: "Submission type is required",
    invalid_type_error: "Submission type must be a string",
  }),
  contentId: z.string({
    required_error: "Content ID is required",
    invalid_type_error: "Content ID must be a string",
  }),
});
