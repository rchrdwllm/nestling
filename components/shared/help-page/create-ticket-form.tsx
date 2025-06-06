"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateTicketSchema } from "@/schemas/CreateTicketSchema";
import { createTicket } from "@/server/actions/create-ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type CreateTicketFormProps = {
  setIsOpen: (isOpen: boolean) => void;
};

const CreateTicketForm = ({ setIsOpen }: CreateTicketFormProps) => {
  const form = useForm<z.infer<typeof CreateTicketSchema>>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(CreateTicketSchema),
  });
  const { execute, isExecuting } = useAction(createTicket, {
    onSuccess: ({ data }) => {
      toast.dismiss();
      toast.success(data?.success || "Ticket created successfully");
      setIsOpen(false);
    },
    onError: ({ error }) => {
      toast.dismiss();
      toast.error(
        error
          ? JSON.stringify(error)
          : "An error occurred while creating the ticket"
      );
      setIsOpen(false);
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Creating ticket...");
    },
  });

  const handleSubmit = (data: z.infer<typeof CreateTicketSchema>) => {
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
              <Input placeholder="Ticket title" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Ticket description" {...field} />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-end">
          <Button onClick={() => setIsOpen(false)} variant="secondary">
            Back
          </Button>
          <Button type="submit" disabled={isExecuting}>
            Create ticket
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateTicketForm;
