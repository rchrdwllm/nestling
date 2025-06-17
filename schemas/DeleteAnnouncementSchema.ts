import * as z from "zod";

export const DeleteAnnouncementSchema = z.object({
  announcementId: z.string().uuid(),
});
