"use client";

import { Form } from "@/components/ui/form";
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
import { Calendar as CalendarIcon, FileIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { File as CustomFile, Task, User } from "@/types";
import { useAction } from "next-safe-action/hooks";
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
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { createTask } from "@/server/actions/create-task";
import { CreateTaskSchema } from "@/schemas/CreateTaskSchema";
import { MAX_SIZE } from "@/constants/file";
import { getSHA256 } from "@/lib/sha-256";
import { uploadFileToCloudinary } from "@/server/actions/upload-to-cloudinary";
import { addAttachment } from "@/server/actions/add-attachment";
import AttachmentPreview from "./attachment-preview";
import { archiveTask } from "@/server/actions/archive-task";

type CreateTaskFormProps = {
  projectId: string;
  availableAssignees: User[];
  isEdit?: boolean;
  task?: Task;
  setIsOpen: (isOpen: boolean) => void;
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  attachments?: CustomFile[];
};

const CreateTaskForm = ({
  projectId,
  availableAssignees,
  isEdit = false,
  task,
  setIsOpen,
  selectedStartDate,
  selectedEndDate,
  attachments = [],
}: CreateTaskFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const initialPreviewUrls = useMemo(
    () =>
      attachments.map((attachment) => ({
        name: attachment.public_id,
        type: attachment.resource_type,
        url: attachment.secure_url,
      })),
    [attachments]
  );
  const [previewUrls, setPreviewUrls] =
    useState<{ url: string; type: string; name: string }[]>(initialPreviewUrls);
  const form = useForm<z.infer<typeof CreateTaskSchema>>({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      startDate: task?.startDate
        ? new Date(task?.startDate)
        : selectedStartDate
        ? selectedStartDate
        : undefined,
      endDate: task?.endDate
        ? new Date(task?.endDate)
        : selectedEndDate
        ? selectedEndDate
        : undefined,
      assignees: task?.assignees || [],
      priority: task?.priority || "low",
      status: task?.status || "planned",
      projectId,
      isEdit,
      taskId: task?.id || undefined,
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
  const { execute: attachmentExecute } = useAction(addAttachment);
  const { execute: taskArchive } = useAction(archiveTask, {
    onSuccess: ({ data }) => {
      toast.dismiss();
      toast.success(data?.success);
      setIsOpen(false);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(`Error archiving task: ${error}`);
    },
  });

  useEffect(() => {
    if (task) {
      form.setValue("title", task.title);
      form.setValue("description", task.description);
      form.setValue("startDate", new Date(task.startDate));
      form.setValue("endDate", new Date(task.endDate));
      form.setValue("assignees", task.assignees);
      form.setValue("priority", task.priority);
      form.setValue("status", task.status);
      form.setValue("projectId", task.projectId);
      form.setValue("taskId", task.id);
    }
  }, [task]);

  const handleSubmit = async (data: z.infer<typeof CreateTaskSchema>) => {
    execute(data);
  };

  const addFiles = useCallback((e: ChangeEvent) => {
    setIsLoading(true);
    toast.dismiss();
    toast.loading("Adding attachments...");

    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const tooLarge = fileArray.some((file) => file.size > MAX_SIZE);

      if (tooLarge) {
        toast.error(
          `One or more files exceed the maximum size of ${
            MAX_SIZE / 1024 / 1024
          }MB.`
        );

        return;
      }

      handleAddAttachment(fileArray);
    }
  }, []);

  const handleAddAttachment = async (files: File[]) => {
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const hash = await getSHA256(file);
        const { success: uploadedFile, error } = await uploadFileToCloudinary(
          file
        );

        if (error || !uploadedFile) {
          console.error("Error adding attachment: ", error);
          toast.error(JSON.stringify(error));

          return null;
        }

        return { ...uploadedFile, hash };
      })
    );

    if (uploadedFiles.length && task) {
      attachmentExecute({
        taskId: task.id,
        files: uploadedFiles as any,
      });

      toast.dismiss();
      toast.success("Attachments added!");
      setIsLoading(false);
      setPreviewUrls((prev) => [
        ...prev,
        ...uploadedFiles.map((file) => ({
          name: file!.public_id,
          type: file!.resource_type,
          url: file!.secure_url,
        })),
      ]);
    }
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Task description" {...field} />
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
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
                options={availableAssignees.map((user) => ({
                  label: `${user.firstName} ${user.lastName} | ${user.role}`,
                  value: user.id,
                }))}
                onValueChange={field.onChange}
                defaultValue={task ? task?.assignees : []}
                placeholder="Select assignees"
                variant="inverted"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        {isEdit && task && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold">Attachments</h1>
              <div>
                <button
                  type="button"
                  className="aspect-square hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer group transition-colors"
                >
                  <label
                    className="flex flex-col justify-center items-center gap-2 w-full p-2 cursor-pointer text-muted-foreground transition-colors group-hover:text-foreground"
                    htmlFor="submission"
                  >
                    <>
                      <span className="flex items-center gap-2 text-sm font-medium">
                        <Plus className="size-4" />
                      </span>
                    </>
                  </label>
                </button>
                <input
                  type="file"
                  id="submission"
                  name="submission"
                  className="hidden"
                  multiple
                  onChange={addFiles}
                />
              </div>
            </div>
            <div className="border border-border rounded-lg overflow-hidden">
              {previewUrls.length ? (
                previewUrls.map((previewUrl) => (
                  <article key={previewUrl.url}>
                    <AttachmentPreview
                      id={previewUrl.url}
                      type={previewUrl.type}
                      url={previewUrl.url}
                      name={previewUrl.name}
                      taskId={task.id}
                    />
                  </article>
                ))
              ) : (
                <p className="text-muted-foreground text-center my-8">
                  No attachments
                </p>
              )}
            </div>
          </div>
        )}
        {task && isEdit && (
          <Button
            type="button"
            variant="outline"
            className="hover:text-primary"
            onClick={() => {
              taskArchive({ taskId: task.id });
            }}
          >
            {task.isArchived ? "Unarchive" : "Archive"} task
          </Button>
        )}
        <Button type="submit" disabled={isExecuting || isLoading}>
          {isEdit ? "Update task" : "Create task"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateTaskForm;
