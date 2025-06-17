import * as z from "zod";

export const DeleteDiscussionReplySchema = z.object({
  replyId: z.string({
    required_error: "Reply ID is required",
    invalid_type_error: "Reply ID must be a string",
  }),
});
