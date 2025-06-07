"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CreateTicketSchema } from "@/schemas/CreateTicketSchema";
import { ReplyTicketSchema } from "@/schemas/ReplyTicketSchema";
import { replyToTicket } from "@/server/actions/reply-to-ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type ReplyTicketFormProps = {
  setIsOpen: (isOpen: boolean) => void;
  ticketId: string;
};

const ReplyTicketForm = ({ setIsOpen, ticketId }: ReplyTicketFormProps) => {
  const form = useForm<z.infer<typeof ReplyTicketSchema>>({
    defaultValues: {
      reply: "",
      ticketId,
    },
    resolver: zodResolver(ReplyTicketSchema),
  });
  const { execute, isExecuting } = useAction(replyToTicket, {
    onSuccess: ({ data }) => {
      toast.dismiss();
      toast.success(
        data?.success ||
          JSON.stringify(data?.error) ||
          "Replied to ticket successfully"
      );
      setIsOpen(false);
    },
    onError: ({ error }) => {
      toast.dismiss();
      toast.error(
        error
          ? JSON.stringify(error)
          : "An error occurred while replying to the ticket"
      );
      setIsOpen(false);
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Replying to ticket...");
    },
  });

  const handleSubmit = (data: z.infer<typeof ReplyTicketSchema>) => {
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
          name="reply"
          render={({ field }) => (
            <FormItem>
              <Textarea placeholder="Add your reply here" {...field} />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-end">
          <Button onClick={() => setIsOpen(false)} variant="secondary">
            Back
          </Button>
          <Button type="submit" disabled={isExecuting}>
            Add reply
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReplyTicketForm;
