import * as z from "zod";

export const DeleteAttachmentSchema = z.object({
  taskId: z.string(),
  attachmentId: z.string(),
});
