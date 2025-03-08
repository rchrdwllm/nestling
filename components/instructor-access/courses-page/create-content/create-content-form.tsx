"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
  const id = crypto.randomUUID();
  const router = useRouter();
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
    },
  });
  const { execute, isExecuting } = useAction(createContent, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();
        toast.success("Content created successfully");

        router.push(
          `/instructor-courses/${courseId}/modules/content/${data.success.id}`
        );
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
                    <SelectItem value="file">File</SelectItem>
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
            </FormItem>
          )}
        />
        {form.getValues("type") === "assignment" && <AssignmentForm />}
        {form.getValues("type") === "file" ? (
          <FileForm />
        ) : (
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RichTextEditor content={field.value || ""} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <Button type="submit" disabled={isExecuting}>
          Create
        </Button>
      </form>
    </Form>
  );
};

export default CreateContentForm;
