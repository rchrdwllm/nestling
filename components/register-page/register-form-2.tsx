import { Button } from "../ui/button";
import MotionWrapper from "../wrappers/motion-wrapper";
import { easings } from "@/constants/animations";
import { Form, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import * as z from "zod";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { emailRegister } from "@/server/actions/email-register";
import { Role } from "@/types";
import { toast } from "sonner";

type RegisterForm2Props = {
  setStep: (step: number) => void;
  role: Role;
  details: {
    firstName: string;
    middleName?: string;
    lastName: string;
    contactNumber: string;
  };
};

const RegisterForm2 = ({ setStep, role, details }: RegisterForm2Props) => {
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
    },
    resolver: zodResolver(RegisterSchema),
  });
  const { execute } = useAction(emailRegister, {
    onExecute: () => {
      toast.loading("Creating account...");
    },
    onSuccess: ({ data }) => {
      toast.dismiss();

      if (data?.error) {
        toast.error(data?.error as string);
      } else {
        toast.success("Account created successfully");
      }
    },
    onError: (error) => {
      console.log({ error });
      toast.dismiss();
      toast.error(JSON.stringify(error.error));
    },
  });

  const handleSubmit = (data: z.infer<typeof RegisterSchema>) => {
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
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Input type="password" placeholder="Password" {...field} />
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
                  placeholder="Confirm password"
                  {...field}
                />
              </FormItem>
            )}
          />
          <div className="max-w-[300px] w-full flex gap-4">
            <Button
              className="w-full"
              onClick={() => setStep(2)}
              variant="secondary"
            >
              Go back
            </Button>
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </div>
        </form>
      </Form>
    </MotionWrapper>
  );
};

export default RegisterForm2;
