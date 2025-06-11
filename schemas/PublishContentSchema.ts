import * as z from "zod";

export const PublishContentSchema = z.object({
  contentId: z.string({
    required_error: "Content ID is required",
    invalid_type_error: "Content ID must be a string",
  }),
  defaultPublished: z.boolean({
    required_error: "Default published is required",
    invalid_type_error: "Default published must be a boolean",
  }),
});
