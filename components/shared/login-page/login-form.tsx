import { Button } from "../../ui/button";
import MotionWrapper from "../../wrappers/motion-wrapper";
import { easings } from "@/constants/animations";
import { Form, FormField, FormItem, FormMessage } from "../../ui/form";
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
import { useState, useEffect } from "react";
import { useAction } from "next-safe-action/hooks";
import { logUserActivity } from "@/server/actions/log-user-activity";
import { Eye, EyeOff } from "lucide-react";

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
  const { execute } = useAction(logUserActivity);

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
          execute({
            userId: success.id,
            type: "login",
            details: {
              role: success.role,
            },
          });
          toast.dismiss();
          toast.success("Login successful");
          router.push("/dashboard");
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

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        form.handleSubmit(handleSubmit)();
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [form, handleSubmit]);

  return (
    <MotionWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easings.easeOutExpo as any }}
      className="flex flex-col items-center gap-8 w-full"
    >
      <div>
        <h1 className="font-semibold text-2xl text-center">Welcome back!</h1>
        <p className="mx-auto w-2/3 text-muted-foreground text-sm text-center">
          Log in to your account to continue using Nestling
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-full max-w-[300px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="Email address" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              const [showPassword, setShowPassword] = useState(false);

              return (
                <FormItem className="relative">
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="top-1 right-3 absolute text-muted-foreground -translate-y-1/8"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <FormMessage />
                  <Link href="/api/auth/forgot-password">
                    <Button
                      type="button"
                      variant="link"
                      className="px-3 text-muted-foreground hover:text-primary text-xs"
                    >
                      Forgot password?
                    </Button>
                  </Link>
                </FormItem>
              );
            }}
          />
          <div className="flex gap-4 w-full max-w-[300px]">
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
