"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateCourseSchema } from "@/schemas/CreateCourseSchema";
import { createCourse } from "@/server/actions/create-course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const CreateCourseForm = () => {
  const form = useForm<z.infer<typeof CreateCourseSchema>>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      name: "",
      courseCode: "",
      description: "",
    },
  });
  const { execute, isExecuting } = useAction(createCourse, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();
        toast.success(data.success);
      } else if (data?.error) {
        toast.dismiss();
        toast.error(data.error as string);
      }
    },
    onError: ({ error }) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Creating course...");
    },
  });

  const handleSubmit = (data: z.infer<typeof CreateCourseSchema>) => {
    execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Course name" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseCode"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Course code" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Course description" {...field} />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isExecuting}>
          Create course
        </Button>
      </form>
    </Form>
  );
};

export default CreateCourseForm;
