import * as z from "zod";

export const GeneralSearchSchema = z.object({
  query: z.string().min(1, "Search query must be at least 1 character long"),
  tab: z.enum(
    ["students", "instructors", "admins", "courses", "content", "projects"],
    {
      required_error: "Tab selection is required",
      invalid_type_error: "Tab must be one of the predefined options",
    }
  ),
});
