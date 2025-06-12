import * as z from "zod";

export const CreateUniversalAnnouncementSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(1000, "Description must be at most 1000 characters"),
  files: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().url(),
        type: z.string(),
        size: z.number(),
      })
    )
    .optional(),
  createdAt: z.date().optional(),
  isArchived: z.boolean().optional(),
});