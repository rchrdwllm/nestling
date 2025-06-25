import { Button } from "@/components/ui/button";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { easings } from "@/constants/animations";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkEmailRegister } from "@/server/actions/check-email-register";
import { Role } from "@/types";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { logUserActivity } from "@/server/actions/log-user-activity";
import { Eye, EyeOff } from "lucide-react";

type RegisterForm2Props = {
  setStep: (step: number) => void;
  role: Role;
  details: {
    firstName: string;
    middleName?: string;
    lastName: string;
    contactNumber: string;
    address: string;
  };
};

const RegisterForm2 = ({ setStep, role, details }: RegisterForm2Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // <-- Add this state
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // <-- Add this state
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: role,
      firstName: details.firstName,
      middleName: details.middleName,
      lastName: details.lastName,
      contactNumber: details.contactNumber,
      address: details.address,
    },
    resolver: zodResolver(RegisterSchema),
  });
  const { execute } = useAction(logUserActivity);

  const handleSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true);

    toast.dismiss();
    toast.loading("Creating account...");

    const { success, error } = await checkEmailRegister(data);

    if (success) {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirectTo: "/",
        redirect: false,
      })
        .then(() => {
          execute({
            userId: success.id,
            type: "register",
            details: {
              role: success.role,
            },
          });
          toast.dismiss();
          toast.success("Account created successfully");
          router.push("/dashboard");
          setIsLoading(false);
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error);
          setIsLoading(false);
        });
    } else if (error) {
      toast.dismiss();
      toast.error(error as string);
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
        <h1 className="font-semibold text-2xl text-center">
          Welcome to Nestling!
        </h1>
        <p className="text-muted-foreground w-2/3 text-center mx-auto text-sm">
          Create your account to get started
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
                <Input placeholder="Email" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...field}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1 -translate-y-0 text-muted-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  {...field}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1 -translate-y-0 text-muted-foreground"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="max-w-[300px] w-full flex gap-4">
            <Button
              className="w-full"
              onClick={() => setStep(2)}
              variant="secondary"
              disabled={isLoading}
              type="button"
            >
              Go back
            </Button>
            <Button type="submit" className="w-full" disabled={isLoading}>
              Create account
            </Button>
          </div>
        </form>
      </Form>
    </MotionWrapper>
  );
};

export default RegisterForm2;
