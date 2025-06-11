import * as z from "zod";
import { UploadFileSchema } from "./UploadFileSchema";

export const AddAttachmentSchema = z.object({
  taskId: z.string({
    required_error: "Task ID is required",
    invalid_type_error: "Task ID must be a string",
  }),
  files: z
    .array(UploadFileSchema, {
      required_error: "At least one file is required",
      invalid_type_error: "Files must be an array",
    })
    .or(
      z.array(z.null(), {
        invalid_type_error: "Files must be an array of files or nulls",
      })
    ),
});
