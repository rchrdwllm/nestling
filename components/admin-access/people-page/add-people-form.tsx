"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterEmailSchema } from "@/schemas/RegisterEmailSchema";
import { createModule } from "@/server/actions/create-module";
import { registerEmail } from "@/server/actions/register-email";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type AddPeopleForm = {
  setIsOpen: (isOpen: boolean) => void;
  isEdit?: boolean;
};

const AddPeopleForm = ({ setIsOpen, isEdit }: AddPeopleForm) => {
  const form = useForm<z.infer<typeof RegisterEmailSchema>>({
    resolver: zodResolver(RegisterEmailSchema),
    defaultValues: {
      email: "",
      role: undefined,
      // isEdit: isEdit || false,
    },
  });
  const { execute, isExecuting } = useAction(registerEmail, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();
        toast.success(data.success);
      } else if (data?.error) {
        toast.dismiss();
        toast.error(JSON.stringify(data.error));
      }

      setIsOpen(false);
    },
    onError: ({ error }) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));

      setIsOpen(false);
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading(`${isEdit ? "Editing" : "Registering"} email...`);
    },
  });

  const handleSubmit = (data: z.infer<typeof RegisterEmailSchema>) => {
    execute(data);
  };

  // useEffect(() => {
  //   if (isEdit && module) {
  //     form.setValue("title", module.title);
  //     form.setValue("isEdit", isEdit);
  //     form.setValue("moduleId", module.id);
  //   }
  // }, [isEdit, module]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Email" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="instructor">Instructor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-end">
          <Button onClick={() => setIsOpen(false)} variant="secondary">
            Back
          </Button>
          <Button type="submit" disabled={isExecuting}>
            {isEdit ? "Update details" : "Register email"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPeopleForm;
