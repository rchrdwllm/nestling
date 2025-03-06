import * as z from "zod";

export const PublishContentSchema = z.object({
  contentId: z.string(),
  defaultPublished: z.boolean(),
});
