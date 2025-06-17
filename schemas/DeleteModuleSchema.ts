import * as z from "zod";

export const DeleteModuleSchema = z.object({
  moduleId: z.string().min(1, "Module ID is required"),
});
