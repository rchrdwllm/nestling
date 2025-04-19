import * as z from "zod";

export const CreateThreadSchema = z.object({
  userIds: z.array(z.string()).nonempty("User IDs are required"),
  channelId: z.string().nonempty("Channel ID is required"),
});
