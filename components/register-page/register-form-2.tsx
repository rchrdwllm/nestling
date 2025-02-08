import { Button } from "../ui/button";
import MotionWrapper from "../wrappers/motion-wrapper";
import { easings } from "@/constants/animations";
import { Form, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

type RegisterForm2Props = {
  setStep: (step: number) => void;
};

const RegisterForm2 = ({ setStep }: RegisterForm2Props) => {
  const form = useForm();

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
        <form className="w-full max-w-[300px] flex flex-col gap-4">
          <FormField
            control={form.control}
            name="..."
            render={() => (
              <FormItem>
                <Input placeholder="Email" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="..."
            render={() => (
              <FormItem>
                <Input type="password" placeholder="Password" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="..."
            render={() => (
              <FormItem>
                <Input type="password" placeholder="Confirm password" />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="max-w-[300px] w-full flex gap-4">
        <Button
          className="w-full"
          onClick={() => setStep(2)}
          variant="secondary"
        >
          Go back
        </Button>
        <Button className="w-full">Create account</Button>
      </div>
    </MotionWrapper>
  );
};

export default RegisterForm2;
