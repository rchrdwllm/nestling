import * as z from "zod";

export const CreateTicketSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Priority is required",
    invalid_type_error: "Priority must be one of low, medium, or high",
  }),
  category: z.enum(
    [
      "course_content",
      "technical_issue",
      "enrollment",
      "grading",
      "account",
      "feedback",
      "other",
    ],
    {
      required_error: "Category is required",
      invalid_type_error:
        "Category must be one of course content, technical issue, enrollment, grading, account, feedback, or other",
    }
  ),
});
