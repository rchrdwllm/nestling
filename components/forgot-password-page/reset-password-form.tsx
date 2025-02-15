"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/schemas/ResetPasswordSchema";
import * as z from "zod";
import { Button } from "../ui/button";
import Link from "next/link";

const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleEmailSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
    console.log(data);
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
              <Button className="w-full" variant="secondary">
                Go back
              </Button>
              <Button type="submit" className="w-full">
                Send email
              </Button>
            </div>
            <Link href="/register">
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

export default ResetPasswordForm;
