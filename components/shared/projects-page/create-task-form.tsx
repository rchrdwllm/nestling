"use client";

import { Form } from "@/components/ui/form";
import { CreateProjectSchema } from "@/schemas/CreateProjectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormField, FormItem } from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormMessage } from "@/components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Project, User } from "@/types";
import { useAction } from "next-safe-action/hooks";
import { createProject } from "@/server/actions/create-project";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projectPriorities, projectStatuses } from "@/constants/project";
import { useProjectsTimelineStore } from "@/context/projects-timeline-context";
import { useEffect, useMemo } from "react";
import { createTask } from "@/server/actions/create-task";
import { CreateTaskSchema } from "@/schemas/CreateTaskSchema";

type CreateTaskFormProps = {
  projectId: string;
  availableAssignees: string;
  isEdit?: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const CreateTaskForm = ({
  projectId,
  availableAssignees,
  isEdit = false,
  setIsOpen,
}: CreateTaskFormProps) => {
  const availableAssigneesData = useMemo(
    () => JSON.parse(availableAssignees) as User[],
    [availableAssignees]
  );
  const form = useForm<z.infer<typeof CreateTaskSchema>>({
    defaultValues: {
      title: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
      assignees: [],
      priority: "low",
      status: "planned",
      projectId,
    },
    resolver: zodResolver(CreateTaskSchema),
  });
  const { execute, isExecuting } = useAction(createTask, {
    onExecute: () => {
      toast.dismiss();
      toast.loading(isEdit ? "Updating task..." : "Creating task...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(
        isEdit ? "Task updated successfully" : "Task created successfully"
      );
      form.reset();
      setIsOpen(false);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(`Error ${isEdit ? "updating" : "creating"} task: ${error}`);
    },
  });

  const handleSubmit = async (data: z.infer<typeof CreateTaskSchema>) => {
    execute(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Task title" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Task description" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      {projectStatuses.map((status) => (
                        <SelectItem key={status.id} value={status.value}>
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-block size-2 rounded-md"
                              style={{ backgroundColor: status.color }}
                            ></span>{" "}
                            <span>{status.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <Select>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      {projectPriorities.map((priority) => (
                        <SelectItem key={priority.id} value={priority.value}>
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-block size-2 rounded-md"
                              style={{ backgroundColor: priority.color }}
                            ></span>{" "}
                            <span>{priority.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      notAnimated
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Start date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      notAnimated
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>End date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      const startDate = form.getValues("startDate");
                      return startDate && date < startDate;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assignees"
          render={({ field }) => (
            <FormItem>
              <MultiSelect
                options={availableAssigneesData.map((user) => ({
                  label: `${user.firstName} ${user.lastName}`,
                  value: user.id,
                }))}
                onValueChange={field.onChange}
                defaultValue={[]}
                placeholder="Select assignees"
                variant="inverted"
              />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isExecuting}>
          {isEdit ? "Update task" : "Create task"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateTaskForm;
