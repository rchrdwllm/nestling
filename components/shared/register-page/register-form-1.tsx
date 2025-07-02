import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { easings } from "@/constants/animations";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterStep1Schema } from "@/schemas/RegisterStep1Schema";
import * as z from "zod";

type RegisterForm1Props = {
  setStep: (step: number) => void;
  details: {
    firstName: string;
    middleName: string;
    lastName: string;
    contactNumber: string;
    address: string;
  };
  setDetails: (details: {
    firstName: string;
    middleName: string;
    lastName: string;
    contactNumber: string;
    address: string;
  }) => void;
};

const RegisterForm1 = ({
  setStep,
  details,
  setDetails,
}: RegisterForm1Props) => {
  const form = useForm<z.infer<typeof RegisterStep1Schema>>({
    resolver: zodResolver(RegisterStep1Schema),
    defaultValues: details,
    mode: "onTouched",
  });

  // Keep details in sync with form state
  const syncDetails = (field: keyof typeof details, value: string) => {
    setDetails({ ...details, [field]: value });
    form.setValue(field, value, { shouldValidate: true });
  };

  return (
    <MotionWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easings.easeOutExpo as any }}
      className="flex flex-col items-center gap-8 w-full"
    >
      <div>
        <h1 className="font-semibold text-2xl text-center">
          Welcome to Nestling!
        </h1>
        <p className="mx-auto w-2/3 text-muted-foreground text-sm text-center">
          Create your account to get started
        </p>
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-4 w-full max-w-[300px]">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="First name"
                  {...field}
                  value={details.firstName}
                  onChange={(e) => syncDetails("firstName", e.target.value)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Middle name"
                  {...field}
                  value={details.middleName}
                  onChange={(e) => syncDetails("middleName", e.target.value)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Last name"
                  {...field}
                  value={details.lastName}
                  onChange={(e) => syncDetails("lastName", e.target.value)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Contact number"
                  {...field}
                  value={details.contactNumber}
                  onChange={(e) => syncDetails("contactNumber", e.target.value)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Address"
                  {...field}
                  value={details.address}
                  onChange={(e) => syncDetails("address", e.target.value)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex gap-4">
        <Button type="button" onClick={() => setStep(1)} variant="secondary">
          <ArrowLeft />
        </Button>
        <Button
          type="button"
          onClick={async () => {
            const valid = await form.trigger();
            if (valid) {
              setStep(3);
            }
          }}
        >
          <ArrowRight />
        </Button>
      </div>
    </MotionWrapper>
  );
};

export default RegisterForm1;
