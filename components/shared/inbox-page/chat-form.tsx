"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";

const ChatForm = () => {
  const form = useForm();

  return (
    <div className="p-4 border-t border-border">
      <Form {...form}>
        <form className="flex items-end gap-2">
          <FormField
            control={form.control}
            name="email"
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
          <Button type="submit">
            <SendHorizontal />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatForm;
