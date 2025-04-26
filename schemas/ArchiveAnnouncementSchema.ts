import * as z from "zod";

export const ArchiveAnnouncementSchema = z.object({
  announcementId: z.string().min(1, { message: "Announcement ID is required" }),
});
