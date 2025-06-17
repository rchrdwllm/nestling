import * as z from "zod";

export const DeleteContentSchema = z.object({
  contentId: z.string({
    required_error: "Content ID is required",
    invalid_type_error: "Content ID must be a string",
  }),
});
