import * as z from "zod";

export const UploadImageSchema = z.object({
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
  content_id: z
    .string({
      invalid_type_error: "Content ID must be a string",
    })
    .optional(),
  course_id: z
    .string({
      invalid_type_error: "Course ID must be a string",
    })
    .optional(),
  discussion_id: z
    .string({
      invalid_type_error: "Discussion ID must be a string",
    })
    .optional(),
  reply_id: z
    .string({
      invalid_type_error: "Reply ID must be a string",
    })
    .optional(),
  isEdit: z
    .boolean({
      invalid_type_error: "isEdit must be a boolean",
    })
    .optional(),
  hash: z.string({
    required_error: "Hash is required",
    invalid_type_error: "Hash must be a string",
  }),
});
