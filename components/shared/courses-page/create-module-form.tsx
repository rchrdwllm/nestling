"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateModuleSchema } from "@/schemas/CreateModuleSchema";
import { createModule } from "@/server/actions/create-module";
import { Module } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type CreateModuleFormProps = {
  setIsOpen: (isOpen: boolean) => void;
  courseId: string;
  isEdit?: boolean;
  module?: Module;
};

const CreateModuleForm = ({
  setIsOpen,
  courseId,
  module,
  isEdit,
}: CreateModuleFormProps) => {
  const form = useForm<z.infer<typeof CreateModuleSchema>>({
    resolver: zodResolver(CreateModuleSchema),
    defaultValues: {
      title: module?.title || "",
      courseId,
      isEdit: isEdit || false,
      moduleId: module?.id || "",
    },
  });
  const { execute, isExecuting } = useAction(createModule, {
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
      toast.loading(`${isEdit ? "Editing" : "Creating"} module...`);
    },
  });

  const handleSubmit = (data: z.infer<typeof CreateModuleSchema>) => {
    execute(data);
  };

  useEffect(() => {
    if (isEdit && module) {
      form.setValue("title", module.title);
      form.setValue("isEdit", isEdit);
      form.setValue("moduleId", module.id);
    }
  }, [isEdit, module]);

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
              <Input placeholder="Module title" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-end">
          <Button onClick={() => setIsOpen(false)} variant="secondary">
            Back
          </Button>
          <Button type="submit" disabled={isExecuting}>
            {isEdit ? "Edit" : "Create"} module
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateModuleForm;
