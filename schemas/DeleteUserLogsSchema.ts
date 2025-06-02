import * as z from "zod";

export const DeleteUserLogsSchema = z.object({
  types: z.array(z.enum(["login", "logout", "register"])),
});
