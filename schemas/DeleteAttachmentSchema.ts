import * as z from "zod";

export const DeleteAttachmentSchema = z.object({
  taskId: z.string({
    required_error: "Task ID is required",
    invalid_type_error: "Task ID must be a string",
  }),
  attachmentId: z.string({
    required_error: "Attachment ID is required",
    invalid_type_error: "Attachment ID must be a string",
  }),
});
