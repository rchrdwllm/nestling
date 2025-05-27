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
import { User } from "@/types";
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
import { projectStatuses } from "@/constants/project-statuses";

type CreateProjectFormProps = {
  admins: string;
  instructors: string;
  setIsOpen: (isOpen: boolean) => void;
};

const CreateProjectForm = ({
  admins,
  instructors,
  setIsOpen,
}: CreateProjectFormProps) => {
  const adminsList = JSON.parse(admins) as User[];
  const instructorsList = JSON.parse(instructors) as User[];
  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    defaultValues: {
      title: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
      projectHeads: [],
      projectAssociates: [],
      status: "planned",
    },
    resolver: zodResolver(CreateProjectSchema),
  });
  const { execute, isExecuting } = useAction(createProject, {
    onExecute: () => {
      toast.dismiss();
      toast.loading("Creating project...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Project created successfully");
      form.reset();
      setIsOpen(false);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(`Error creating project: ${error}`);
    },
  });

  const handleSubmit = async (data: z.infer<typeof CreateProjectSchema>) => {
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
              <Input placeholder="Project title" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Project description" {...field} />
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
          name="projectHeads"
          render={({ field }) => (
            <FormItem>
              <MultiSelect
                options={adminsList.map((admin) => ({
                  label: `${admin.firstName} ${admin.lastName}`,
                  value: admin.id,
                }))}
                onValueChange={field.onChange}
                defaultValue={[]}
                placeholder="Select project heads"
                variant="inverted"
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectAssociates"
          render={({ field }) => (
            <FormItem>
              <MultiSelect
                options={instructorsList.map((instructor) => ({
                  label: `${instructor.firstName} ${instructor.lastName}`,
                  value: instructor.id,
                }))}
                onValueChange={field.onChange}
                defaultValue={[]}
                placeholder="Select project associates"
                variant="inverted"
              />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isExecuting}>
          Create project
        </Button>
      </form>
    </Form>
  );
};

export default CreateProjectForm;
