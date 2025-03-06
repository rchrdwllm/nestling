import * as z from "zod";

export const PublishModuleSchema = z.object({
  moduleId: z.string(),
  defaultPublished: z.boolean(),
});
