"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateModuleSchema } from "@/schemas/CreateModuleSchema";
import { createModule } from "@/server/actions/create-module";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type CreateModuleFormProps = {
  setIsOpen: (isOpen: boolean) => void;
  courseId: string;
};

const CreateModuleForm = ({ setIsOpen, courseId }: CreateModuleFormProps) => {
  const form = useForm<z.infer<typeof CreateModuleSchema>>({
    resolver: zodResolver(CreateModuleSchema),
    defaultValues: {
      name: "",
      courseId,
    },
  });
  const { execute, isExecuting } = useAction(createModule, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();
        toast.success(data.success);
      } else if (data?.error) {
        toast.dismiss();
        toast.error(data.error as string);
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
      toast.loading("Creating course...");
    },
  });

  const handleSubmit = (data: z.infer<typeof CreateModuleSchema>) => {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Module name" {...field} />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-end">
          <Button onClick={() => setIsOpen(false)} variant="secondary">
            Back
          </Button>
          <Button type="submit" disabled={isExecuting}>
            Create module
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateModuleForm;
