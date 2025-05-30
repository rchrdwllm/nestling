import * as z from "zod";

export const DeleteAllNotifSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});
