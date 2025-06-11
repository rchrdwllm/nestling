import * as z from "zod";

export const PublishModuleSchema = z.object({
  moduleId: z.string({
    required_error: "Module ID is required",
    invalid_type_error: "Module ID must be a string",
  }),
  defaultPublished: z.boolean({
    required_error: "Default published is required",
    invalid_type_error: "Default published must be a boolean",
  }),
});
