import * as z from "zod";

export const ArchiveProjectSchema = z.object({
  projectId: z.string({
    required_error: "Project ID is required",
    invalid_type_error: "Project ID must be a string",
  }),
});
