"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import RichTextEditor from "../create-content/rich-text-editor";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ReplyDiscussionSchema } from "@/schemas/ReplyDiscussionSchema";
import { replyToDiscussion } from "@/server/actions/reply-to-discussion";

type ReplyDiscussionFormProps = {
  courseId: string;
  discussionId: string;
  setIsOpen: (isOpen: boolean) => void;
};

const ReplyDiscussionForm = ({
  courseId,
  discussionId,
  setIsOpen,
}: ReplyDiscussionFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof ReplyDiscussionSchema>>({
    defaultValues: {
      content: "",
      courseId,
      discussionId,
    },
    resolver: zodResolver(ReplyDiscussionSchema),
  });
  const { execute, isExecuting } = useAction(replyToDiscussion, {
    onSuccess: ({ data }) => {
      toast.dismiss();
      toast.success("Discussion replied successfully!");

      setIsOpen(false);
    },
    onError: (error) => {
      console.error("Error replying to discussion:", error);

      toast.dismiss();
      toast.error("Error replying to discussion: " + JSON.stringify(error));
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Replying to discussion...");
    },
  });

  const handleSubmit = (data: z.infer<typeof ReplyDiscussionSchema>) => {
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RichTextEditor content={field.value || ""} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            onClick={() => setIsOpen(false)}
            variant="secondary"
            disabled={isExecuting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isExecuting}>
            Create reply
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReplyDiscussionForm;
