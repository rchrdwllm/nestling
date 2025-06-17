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
import { useEffect } from "react";

type AddUserFormProps = {
  setIsOpen: (isOpen: boolean) => void;
  courseId: string;
  students: User[];
  instructors: User[];
  enrolledStudents: User[];
  courseInstructors: User[];
};

const AddUserForm = ({
  setIsOpen,
  courseId,
  students,
  instructors,
  enrolledStudents,
  courseInstructors,
}: AddUserFormProps) => {
  const { user } = useCurrentUser();
  const getInitialUserIds = () => {
    if (user.role === "admin") {
      return [];
    }

    const studentIds = enrolledStudents.map((student) => student.id);

    return studentIds.length > 0 ? studentIds : [];
  };
  const form = useForm<z.infer<typeof AddUserToCourseSchema>>({
    resolver: zodResolver(AddUserToCourseSchema),
    mode: "onSubmit",
    defaultValues: {
      courseId,
      role: user.role === "admin" ? undefined : "student",
      userIds: getInitialUserIds() as any,
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
      toast.loading("Updating course users...");
    },
  });
  useEffect(() => {
    if (user.role !== "admin") {
      const studentIds = enrolledStudents.map((student) => student.id);
      if (studentIds.length > 0) {
        form.setValue("userIds", studentIds as any);
      }
    }
  }, [user.role, enrolledStudents, form]);
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "role") {
        const newUserIds =
          value.role === "instructor"
            ? courseInstructors.map((instructor) => instructor.id)
            : enrolledStudents.map((student) => student.id);

        form.setValue("userIds", newUserIds as any);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, courseInstructors, enrolledStudents]);
  const handleSubmit = (data: z.infer<typeof AddUserToCourseSchema>) => {
    if (!data.userIds || data.userIds.length === 0) {
      form.setError("userIds", {
        type: "manual",
        message: "At least one user must be selected",
      });

      return;
    }

    const validUserIds = data.userIds.filter(
      (id) => id !== "placeholder" && id !== ""
    );

    if (validUserIds.length === 0) {
      form.setError("userIds", {
        type: "manual",
        message: "At least one user must be selected",
      });

      return;
    }
    execute({
      ...data,
      userIds: validUserIds as [string, ...string[]],
    });
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
        )}{" "}
        <FormField
          control={form.control}
          name="userIds"
          render={({ field }) => (
            <FormItem>
              <MultiSelect
                options={
                  form.watch("role") === "instructor"
                    ? instructors.map((user) => ({
                        label: `${user.firstName} ${user.lastName}`,
                        value: user.id,
                      }))
                    : students.map((user) => ({
                        label: `${user.firstName} ${user.lastName}`,
                        value: user.id,
                      }))
                }
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                placeholder={
                  form.watch("role") === "instructor"
                    ? "Select instructors"
                    : form.watch("role") === "student"
                    ? "Select students"
                    : "Select users"
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
          <Button
            onClick={() => console.log(form.getValues())}
            disabled={isExecuting}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddUserForm;
