"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { CreateContentSchema } from "@/schemas/CreateContentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createContent } from "@/server/actions/create-content";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RichTextEditor from "./rich-text-editor";

type CreateContentFormProps = {
  defaultModule?: string;
  modules: {
    title: string;
    moduleNumber: number;
    id: string;
  }[];
  courseId: string;
};

const CreateContentForm = ({
  defaultModule,
  modules,
  courseId,
}: CreateContentFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof CreateContentSchema>>({
    resolver: zodResolver(CreateContentSchema),
    defaultValues: {
      title: "",
      moduleId: defaultModule || "",
      courseId,
    },
  });
  const { execute, isExecuting } = useAction(createContent, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();
        toast.success(data.success);

        router.push(`/instructor-courses/${courseId}`);
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
      toast.loading("Creating content...");
    },
  });

  const handleSubmit = (data: z.infer<typeof CreateContentSchema>) => {
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Content type</SelectLabel>
                    <SelectItem value="lesson">Lesson</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormItem>
                <Input placeholder="Title" {...field} />
              </FormItem>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="moduleId"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Module</SelectLabel>
                    {modules.map((module) => (
                      <SelectItem key={module.id} value={module.id}>
                        {module.moduleNumber} - {module.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RichTextEditor content={field.value} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isExecuting}>
          Create
        </Button>
      </form>
    </Form>
  );
};

export default CreateContentForm;
