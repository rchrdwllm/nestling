"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { sendMessage } from "@/server/actions/send-message";
import { useAction } from "next-safe-action/hooks";
import { InboxSchema } from "@/schemas/InboxSchema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";

type ChatFormProps = {
  receiverId: string;
};

const ChatForm = ({ receiverId }: ChatFormProps) => {
  const { user } = useCurrentUser();
  const form = useForm<z.infer<typeof InboxSchema>>({
    defaultValues: {
      message: "",
      senderId: user.id,
      receiverId,
    },
    resolver: zodResolver(InboxSchema),
  });
  const { execute, isExecuting } = useAction(sendMessage, {
    onError: () => {
      toast.dismiss();
      toast.error("Failed to send message.");
    },
  });

  const handleSubmit = (data: z.infer<typeof InboxSchema>) => {
    execute({ ...data, senderId: user.id });

    form.reset();
  };

  return (
    <div className="p-4 border-t border-border">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex items-end gap-2"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Textarea
                  className="min-h-8 h-8 py-1 text-sm"
                  placeholder="Send a message"
                  {...field}
                />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isExecuting}>
            <SendHorizontal />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatForm;
