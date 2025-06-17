import * as z from "zod";

export const ArchiveDiscussionSchema = z.object({
  discussionId: z.string({
    description: "The ID of the discussion to archive",
    required_error: "Discussion ID is required",
  }),
});
