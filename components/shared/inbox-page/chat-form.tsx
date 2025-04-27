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
import { generateChannelId } from "@/lib/utils";
import AttachmentBtn from "./attachment-btn";
import { useEffect, useMemo, useState } from "react";
import FilePreviews from "./file-previews";

type ChatFormProps = {
  receiverId: string;
};

const ChatForm = ({ receiverId }: ChatFormProps) => {
  const { user } = useCurrentUser();
  const [counter, setCounter] = useState(0);
  const id = useMemo(() => crypto.randomUUID(), [counter]);
  const form = useForm<z.infer<typeof InboxSchema>>({
    defaultValues: {
      message: "",
      senderId: user.id,
      receiverId,
      channelId: generateChannelId(user.id, receiverId),
      id,
    },
    resolver: zodResolver(InboxSchema),
  });
  const { execute, isExecuting } = useAction(sendMessage, {
    onError: () => {
      toast.dismiss();
      toast.error("Failed to send message.");
    },
    onSuccess: () => {
      setCounter((prev) => prev + 1);
    },
  });

  const handleSubmit = (data: z.infer<typeof InboxSchema>) => {
    execute({ ...data, senderId: user.id, id });

    form.reset();
    form.setValue("type", "text");
  };

  useEffect(() => {
    form.setValue("id", id);
    form.setValue("type", "text");
  }, [counter]);

  return (
    <div className="relative p-4 border-t border-border">
      {form.watch("files") && form.watch("files")!.length > 0 && (
        <FilePreviews files={form.watch("files")!} />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="relative flex items-stretch gap-2 z-[1]"
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      form.handleSubmit(handleSubmit)();
                    }
                  }}
                />
              </FormItem>
            )}
          />
          <AttachmentBtn />
          <Button type="submit" disabled={isExecuting}>
            <SendHorizontal />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatForm;
