"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateAnnouncementSchema } from "@/schemas/CreateAnnouncementSchema";
import { createAnnouncement } from "@/server/actions/create-announcement";
import { Announcement } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type CreateAnnouncementFormProps = {
  setIsOpen: (value: boolean) => void;
  isEdit?: boolean;
  announcement?: Announcement;
};

const CreateAnnouncementForm = ({
  setIsOpen,
  isEdit,
  announcement,
}: CreateAnnouncementFormProps) => {
  const { courseId } = useParams<{ courseId: string }>();
  const form = useForm<z.infer<typeof CreateAnnouncementSchema>>({
    resolver: zodResolver(CreateAnnouncementSchema),
    defaultValues: {
      title: announcement?.title || "",
      content: announcement?.content || "",
      isArchived: announcement?.isArchived || false,
      courseId: courseId || "",
    },
  });
  const { execute, isExecuting } = useAction(createAnnouncement, {
    onExecute: () => {
      toast.dismiss();
      toast.loading(
        isEdit ? "Updating announcement..." : "Creating announcement..."
      );
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(
        isEdit
          ? "Announcement updated successfully!"
          : "Announcement created successfully!"
      );

      setIsOpen(false);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof CreateAnnouncementSchema>
  ) => {
    execute(data);
  };

  useEffect(() => {
    if (isEdit && announcement) {
      form.setValue("title", announcement.title);
      form.setValue("content", announcement.content);
      form.setValue("courseId", announcement.courseId);
      form.setValue("isArchived", announcement.isArchived);
      form.setValue("id", announcement.id);
    } else {
      form.reset();
    }
  }, [isEdit, announcement]);

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
              <Input placeholder="Announcement title" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Announcement content" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isExecuting}>
          {isEdit ? "Edit" : "Create"} announcement
        </Button>
      </form>
    </Form>
  );
};

export default CreateAnnouncementForm;
