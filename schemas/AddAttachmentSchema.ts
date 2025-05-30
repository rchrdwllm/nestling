import * as z from "zod";
import { UploadFileSchema } from "./UploadFileSchema";

export const AddAttachmentSchema = z.object({
  taskId: z.string(),
  files: z.array(UploadFileSchema).or(z.array(z.null())),
});
