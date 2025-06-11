import * as z from "zod";

export const CreateTaskSchema = z.object({
  title: z
    .string({
      required_error: "Task title is required",
      invalid_type_error: "Task title must be a string",
    })
    .min(1, "Task title is required"),
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
  assignees: z
    .array(
      z.string({
        invalid_type_error: "Assignee must be a string",
      }),
      {
        invalid_type_error: "Assignees must be an array of strings",
      }
    )
    .optional(),
  projectId: z.string({
    required_error: "Project ID is required",
    invalid_type_error: "Project ID must be a string",
  }),
  isEdit: z
    .boolean({
      invalid_type_error: "isEdit must be a boolean",
    })
    .optional(),
  taskId: z
    .string({
      invalid_type_error: "Task ID must be a string",
    })
    .optional(),
});
