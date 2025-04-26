"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateAnnouncementSchema } from "@/schemas/CreateAnnouncementSchema";
import { createAnnouncement } from "@/server/actions/create-announcement";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type CreateAnnouncementFormProps = {
  setIsOpen: (value: boolean) => void;
  isEdit?: boolean;
};

const CreateAnnouncementForm = ({
  setIsOpen,
  isEdit,
}: CreateAnnouncementFormProps) => {
  const { courseId } = useParams<{ courseId: string }>();
  const form = useForm<z.infer<typeof CreateAnnouncementSchema>>({
    resolver: zodResolver(CreateAnnouncementSchema),
    defaultValues: {
      title: "",
      content: "",
      courseId,
    },
  });
  const { execute, isExecuting } = useAction(createAnnouncement, {
    onExecute: () => {
      toast.dismiss();
      toast.loading("Creating announcement...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Announcement created successfully!");

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
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Announcement content" {...field} />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isExecuting}>
          Create announcement
        </Button>
      </form>
    </Form>
  );
};

export default CreateAnnouncementForm;
