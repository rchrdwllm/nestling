import * as z from "zod";

export const CreateNotifSchema = z.object({
  type: z.string({
    required_error: "Type is required",
    invalid_type_error: "Type must be a string",
  }),
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
  message: z.string({
    required_error: "Message is required",
    invalid_type_error: "Message must be a string",
  }),
  url: z.string({
    required_error: "URL is required",
    invalid_type_error: "URL must be a string",
  }),
  senderId: z.string({
    required_error: "Sender ID is required",
    invalid_type_error: "Sender ID must be a string",
  }),
  receiverIds: z
    .array(
      z.string({
        required_error: "Receiver ID is required",
        invalid_type_error: "Receiver ID must be a string",
      }),
      {
        invalid_type_error: "Receiver IDs must be an array of strings",
      }
    )
    .optional(),
});
