import * as z from "zod";

export const UploadFileSchema = z.object({
  url: z.string({
    required_error: "URL is required",
    invalid_type_error: "URL must be a string",
  }),
  public_id: z.string({
    required_error: "Public ID is required",
    invalid_type_error: "Public ID must be a string",
  }),
  created_at: z.string({
    required_error: "Created at is required",
    invalid_type_error: "Created at must be a string",
  }),
  asset_id: z.string({
    required_error: "Asset ID is required",
    invalid_type_error: "Asset ID must be a string",
  }),
  secure_url: z.string({
    required_error: "Secure URL is required",
    invalid_type_error: "Secure URL must be a string",
  }),
  type: z.string({
    required_error: "Type is required",
    invalid_type_error: "Type must be a string",
  }),
  content_id: z
    .string({
      invalid_type_error: "Content ID must be a string",
    })
    .optional(),
  submission_id: z
    .string({
      invalid_type_error: "Submission ID must be a string",
    })
    .optional(),
  message_id: z
    .string({
      invalid_type_error: "Message ID must be a string",
    })
    .optional(),
  task_id: z
    .string({
      invalid_type_error: "Task ID must be a string",
    })
    .optional(),
  resource_type: z.string({
    required_error: "Resource type is required",
    invalid_type_error: "Resource type must be a string",
  }),
  hash: z.string({
    required_error: "Hash is required",
    invalid_type_error: "Hash must be a string",
  }),
});
