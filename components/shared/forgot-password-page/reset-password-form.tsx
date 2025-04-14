"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/schemas/ResetPasswordSchema";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { emailResetToken } from "@/server/actions/email-reset-token";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const { execute, isExecuting } = useAction(emailResetToken, {
    onSuccess: ({ data }) => {
      if (data) {
        toast.dismiss();

        if (data.success) {
          toast.success(data.success);

          return;
        }

        if (data.error) {
          toast.error(data.error as any);
        }
      }
    },
    onError: ({ error }) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));
    },
    onExecute: () => {
      toast.loading("Sending email...");
    },
  });

  const handleEmailSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
    execute(data);
  };

  return (
    <div className="flex flex-col items-center w-full gap-8 p-16 h-full">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl text-center">
          Reset your password
        </h1>
        <p className="text-muted-foreground w-[90%] text-center mx-auto text-sm">
          Enter your email associated with your account and we'll send you a
          confirmation link to reset your password
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleEmailSubmit)}
          className="w-full max-w-[300px] flex flex-col gap-4 h-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="Email" type="email" {...field} />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-center gap-2 mt-auto">
            <div className="max-w-[300px] w-full flex gap-4">
              <Link href="/api/auth/signin" className="w-1/2 block">
                <Button type="button" className="w-full" variant="secondary">
                  Go back
                </Button>
              </Link>
              <Button type="submit" className="w-1/2" disabled={isExecuting}>
                Send email
              </Button>
            </div>
            <Link href="/api/auth/signin">
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary"
              >
                Already have an account? Login
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
