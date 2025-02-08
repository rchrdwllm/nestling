import { Button } from "../ui/button";
import MotionWrapper from "../wrappers/motion-wrapper";
import { easings } from "@/constants/animations";
import { Form, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/LoginSchema";
import * as z from "zod";
import { useAction } from "next-safe-action/hooks";
import { emailLogin } from "@/server/actions/email-login";
import { Role } from "@/types";

type LoginFormProps = {
  setStep: (step: number) => void;
  role: Role;
};

const LoginForm = ({ role, setStep }: LoginFormProps) => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      role,
    },
  });
  const { execute } = useAction(emailLogin, {
    onSuccess: ({ data }) => {
      console.log(data);
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const handleSubmit = (data: z.infer<typeof LoginSchema>) => {
    execute(data);
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
                <Link href="/forgot-password">
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
            >
              Go back
            </Button>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </MotionWrapper>
  );
};

export default LoginForm;
