"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import RichTextEditor from "../create-content/rich-text-editor";
import * as z from "zod";
import { CreateDiscussionSchema } from "@/schemas/CreateDiscussionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { createDiscussion } from "@/server/actions/create-discussion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DiscussionTextEditor from "./discussion-text-editor";

type CreateDiscussionFormProps = {
  courseId: string;
  setIsOpen: (isOpen: boolean) => void;
};

const CreateDiscussionForm = ({
  courseId,
  setIsOpen,
}: CreateDiscussionFormProps) => {
  const id = crypto.randomUUID();
  const router = useRouter();
  const form = useForm<z.infer<typeof CreateDiscussionSchema>>({
    defaultValues: {
      content: "",
      title: "",
      courseId: courseId,
      id,
    },
    resolver: zodResolver(CreateDiscussionSchema),
  });
  const { execute, isExecuting } = useAction(createDiscussion, {
    onSuccess: ({ data }) => {
      toast.dismiss();
      toast.success("Discussion created successfully!");

      setIsOpen(false);

      router.push(`/courses/${courseId}/discussions/${data?.id}`);
    },
    onError: (error) => {
      console.error("Error creating discussion:", error);

      toast.dismiss();
      toast.error("Error creating discussion: " + JSON.stringify(error));
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Creating discussion...");
    },
  });

  const handleSubmit = (data: z.infer<typeof CreateDiscussionSchema>) => {
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
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DiscussionTextEditor content={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            onClick={() => setIsOpen(false)}
            variant="secondary"
            disabled={isExecuting}
          >
            Back
          </Button>
          <Button type="submit" disabled={isExecuting}>
            Create discussion
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateDiscussionForm;
