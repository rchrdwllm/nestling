import { Button } from "../../ui/button";
import MotionWrapper from "../../wrappers/motion-wrapper";
import { easings } from "@/constants/animations";
import { Form, FormField, FormItem } from "../../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/LoginSchema";
import * as z from "zod";
import { checkEmailLogin } from "@/server/actions/check-email-login";
import { Role } from "@/types";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginFormProps = {
  setStep: (step: number) => void;
  role: Role;
};

const LoginForm = ({ role, setStep }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);

    toast.dismiss();
    toast.loading("Logging in...");

    const { success, error } = await checkEmailLogin(data);

    if (success) {
      if (success.role !== role) {
        toast.dismiss();
        toast.error("Role mismatch");
        setIsLoading(false);

        return;
      }

      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirectTo: "/",
        redirect: false,
      })
        .then(() => {
          toast.dismiss();
          toast.success("Login successful");
          router.push(`/${success.role}-dashboard`);
          setIsLoading(false);
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(JSON.stringify(error));
          setIsLoading(false);
        });
    } else if (error) {
      toast.dismiss();
      toast.error(JSON.stringify(error));
      setIsLoading(false);
    }
  };

  return (
    <MotionWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easings.easeOutExpo }}
      className="flex flex-col items-center w-full gap-8"
    >
      <div>
        <h1 className="font-semibold text-2xl text-center">Welcome back!</h1>
        <p className="text-muted-foreground w-2/3 text-center mx-auto text-sm">
          Log in to your account to continue using Nestling
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full max-w-[300px] flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="Email address" {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="Password" type="password" {...field} />
                <Link href="/api/auth/forgot-password">
                  <Button
                    variant="link"
                    className="text-muted-foreground hover:text-primary text-xs px-3"
                  >
                    Forgot password?
                  </Button>
                </Link>
              </FormItem>
            )}
          />
          <div className="max-w-[300px] w-full flex gap-4">
            <Button
              className="w-full"
              onClick={() => setStep(1)}
              variant="secondary"
              type="button"
              disabled={isLoading}
            >
              Go back
            </Button>
            <Button type="submit" className="w-full" disabled={isLoading}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </MotionWrapper>
  );
};

export default LoginForm;
