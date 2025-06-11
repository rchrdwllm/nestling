import * as z from "zod";

export const CreateProjectSchema = z.object({
  title: z
    .string({
      required_error: "Project title is required",
      invalid_type_error: "Project title must be a string",
    })
    .min(1, "Project title is required"),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .optional(),
  startDate: z.date({
    required_error: "Start date is required",
    invalid_type_error: "Start date must be a date",
  }),
  endDate: z.date({
    required_error: "End date is required",
    invalid_type_error: "End date must be a date",
  }),
  status: z.enum(["planned", "in-progress", "completed"], {
    required_error: "Status is required",
    invalid_type_error:
      "Status must be one of: planned, in-progress, completed",
  }),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Priority is required",
    invalid_type_error: "Priority must be one of: low, medium, high",
  }),
  projectHeads: z
    .array(
      z.string({
        invalid_type_error: "Project head must be a string",
      }),
      {
        required_error: "At least one project head is required",
        invalid_type_error: "Project heads must be an array of strings",
      }
    )
    .min(1, "At least one project head is required"),
  projectAssociates: z
    .array(
      z.string({
        invalid_type_error: "Project associate must be a string",
      }),
      {
        invalid_type_error: "Project associates must be an array of strings",
      }
    )
    .optional(),
  isEdit: z
    .boolean({
      invalid_type_error: "isEdit must be a boolean",
    })
    .default(false),
  projectId: z
    .string({
      invalid_type_error: "Project ID must be a string",
    })
    .optional(),
});
