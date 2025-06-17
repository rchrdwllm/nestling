"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { AddUserToCourseSchema } from "@/schemas/AddUserToCourseSchema";
import { addUserToCourse } from "@/server/actions/add-user-to-course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "next-auth";
import { MultiSelect } from "@/components/ui/multi-select";
import { useCurrentUser } from "@/hooks/use-current-user";

type AddUserFormProps = {
  setIsOpen: (isOpen: boolean) => void;
  courseId: string;
  availableStudents: User[];
  availableInstructors: User[];
};

const AddUserForm = ({
  setIsOpen,
  courseId,
  availableStudents,
  availableInstructors,
}: AddUserFormProps) => {
  const { user } = useCurrentUser();
  const form = useForm<z.infer<typeof AddUserToCourseSchema>>({
    resolver: zodResolver(AddUserToCourseSchema),
    defaultValues: {
      courseId,
      role: user.role === "admin" ? undefined : "student",
      userIds: [],
    },
  });
  const { execute, isExecuting } = useAction(addUserToCourse, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();
        toast.success(data.success);
      } else if (data?.error) {
        toast.dismiss();
        toast.error(JSON.stringify(data.error));
      }

      setIsOpen(false);
    },
    onError: ({ error }) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));

      setIsOpen(false);
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Adding to course...");
    },
  });

  const handleSubmit = (data: z.infer<typeof AddUserToCourseSchema>) => {
    execute(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        {user.role === "admin" && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="userIds"
          render={({ field }) => (
            <FormItem>
              <MultiSelect
                options={
                  form.watch("role") === "instructor"
                    ? availableInstructors.map((user) => ({
                        label: `${user.firstName} ${user.lastName}`,
                        value: user.id,
                      }))
                    : availableStudents.map((user) => ({
                        label: `${user.firstName} ${user.lastName}`,
                        value: user.id,
                      }))
                }
                onValueChange={field.onChange}
                defaultValue={field.value}
                placeholder={
                  form.watch("role") === "instructor"
                    ? "Select instructors"
                    : "Select students"
                }
                variant="inverted"
                disabled={!form.watch("role")}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button onClick={() => setIsOpen(false)} variant="secondary">
            Back
          </Button>
          <Button type="submit" disabled={isExecuting}>
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddUserForm;
