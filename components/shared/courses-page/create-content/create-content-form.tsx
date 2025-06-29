"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import RichTextEditor from "./rich-text-editor";
import AssignmentForm from "./assignment-form";
import FileForm from "./file-form";
import { Switch } from "@/components/ui/switch";
import { useEffect, useMemo } from "react";
import { File } from "@/types";

type CreateContentFormProps = {
  defaultModule?: string;
  modules: {
    title: string;
    moduleNumber: number;
    id: string;
  }[];
  courseId: string;
  content?: string;
  contentFile?: File | null;
};

const CreateContentForm = ({
  defaultModule,
  modules,
  courseId,
  content,
  contentFile,
}: CreateContentFormProps) => {
  const id = crypto.randomUUID();
  const router = useRouter();
  const isEdit = useMemo(
    () => content && content !== "" && content !== "{}" && content !== "null",
    [content]
  );
  const contentData = content ? JSON.parse(content) : null;
  const form = useForm<z.infer<typeof CreateContentSchema>>({
    resolver: zodResolver(CreateContentSchema),
    defaultValues: {
      title: "",
      moduleId: defaultModule || "",
      courseId,
      points: 10,
      maxAttempts: 1,
      id,
      content: "",
      isPublished: true,
      isEdit: isEdit ? true : false,
      type: contentData?.type || "lesson",
      date: {
        from: contentData?.startDate
          ? new Date(contentData.startDate)
          : undefined,
        to: contentData?.endDate ? new Date(contentData.endDate) : undefined,
      },
      submissionType: contentData?.submissionType || "text",
      isGraded: contentData?.isGraded || false,
    },
  });
  const { execute, isExecuting } = useAction(createContent, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();

        if (isEdit) {
          toast.success("Content edited successfully");
        } else {
          toast.success("Content created successfully");
        }

        router.push(`/courses/${courseId}/modules/content/${data.success.id}`);
      } else if (data?.error) {
        toast.dismiss();
        toast.error(JSON.stringify(data.error));
      }
    },
    onError: ({ error }) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));
    },
    onExecute: () => {
      toast.dismiss();

      if (isEdit) {
        toast.loading("Editing content...");
      } else {
        toast.loading("Creating content...");
      }
    },
  });

  const handleSubmit = (data: z.infer<typeof CreateContentSchema>) => {
    execute(data);
  };

  useEffect(() => {
    if (isEdit) {
      const contentData = JSON.parse(content!);
      form.setValue("content", contentData.content);
      form.setValue("courseId", contentData.courseId);
      form.setValue("id", contentData.id);
      form.setValue("isPublished", contentData.isPublished);
      form.setValue("title", contentData.title);
      form.setValue("type", contentData.type);
      form.setValue("isEdit", true);
      form.setValue("moduleId", contentData.moduleId);

      if (contentData.type === "assignment") {
        form.setValue("date.from", new Date(contentData.startDate!));
        form.setValue("date.to", new Date(contentData.endDate!));
        form.setValue("points", contentData.points);
        form.setValue("submissionType", contentData.submissionType);
        form.setValue("maxAttempts", contentData.maxAttempts);
      }
    }
  }, [content]);

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
              <FormLabel>Content type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Content type</SelectLabel>
                    <SelectItem value="lesson">Lesson</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="file">File</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormItem>
                <Input placeholder="Title" {...field} />
              </FormItem>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="moduleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module</FormLabel>
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex items-center gap-8">
              <FormLabel>Publish by default?</FormLabel>
              <FormControl>
                <Switch
                  defaultChecked={field.value}
                  onCheckedChange={field.onChange}
                  className="[margin-top:_0_!important]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("type") === "assignment" && <AssignmentForm />}
        {form.watch("type") === "file" ? (
          <FileForm contentFile={contentFile} />
        ) : (
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RichTextEditor content={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" disabled={isExecuting}>
          {content ? "Save" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateContentForm;
