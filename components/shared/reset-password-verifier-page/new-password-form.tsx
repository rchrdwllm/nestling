"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas/NewPasswordSchema";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { resetPassword } from "@/server/actions/reset-password";
import { useRouter } from "next/navigation";

const NewPasswordForm = ({ email }: { email: string }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      email,
    },
  });
  const { execute, isExecuting } = useAction(resetPassword, {
    onSuccess: ({ data }) => {
      if (data) {
        toast.dismiss();

        if (data.success) {
          toast.success(data.success);

          router.replace("/api/auth/signin");

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
      toast.loading("Resetting password...");
    },
  });

  const handlePasswordReset = (data: z.infer<typeof NewPasswordSchema>) => {
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
          onSubmit={form.handleSubmit(handlePasswordReset)}
          className="w-full max-w-[300px] flex flex-col gap-4 h-full"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Input type="password" placeholder="New password" {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  {...field}
                />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-center gap-2 mt-auto">
            <div className="max-w-[300px] w-full flex gap-4">
              <Button
                type="button"
                onClick={() => router.push("/api/auth/signin")}
                className="w-full"
                variant="secondary"
              >
                Go back
              </Button>
              <Button type="submit" className="w-full" disabled={isExecuting}>
                Reset password
              </Button>
            </div>
            <Link href="/api/auth/signin">
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary"
                type="submit"
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

export default NewPasswordForm;
