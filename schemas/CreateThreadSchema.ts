import * as z from "zod";

export const CreateThreadSchema = z.object({
  userIds: z
    .array(
      z.string({
        required_error: "User ID is required",
        invalid_type_error: "User ID must be a string",
      }),
      {
        required_error: "User IDs are required",
        invalid_type_error: "User IDs must be an array of strings",
      }
    )
    .nonempty("User IDs are required"),
  channelId: z
    .string({
      required_error: "Channel ID is required",
      invalid_type_error: "Channel ID must be a string",
    })
    .nonempty("Channel ID is required"),
});
