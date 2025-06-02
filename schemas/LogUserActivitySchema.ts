import * as z from "zod";

export const LogUserActivitySchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(["login", "logout", "register"]),
});
