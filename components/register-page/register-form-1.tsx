import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import MotionWrapper from "../wrappers/motion-wrapper";
import { easings } from "@/constants/animations";
import { Form, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { toast } from "sonner";

type RegisterForm1Props = {
  setStep: (step: number) => void;
  details: {
    firstName: string;
    middleName: string;
    lastName: string;
    contactNumber: string;
  };
  setDetails: (details: {
    firstName: string;
    middleName: string;
    lastName: string;
    contactNumber: string;
  }) => void;
};

const RegisterForm1 = ({
  setStep,
  details,
  setDetails,
}: RegisterForm1Props) => {
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
                <Input
                  placeholder="First name"
                  value={details.firstName}
                  onChange={(e) =>
                    setDetails({ ...details, firstName: e.target.value })
                  }
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="..."
            render={() => (
              <FormItem>
                <Input
                  placeholder="Middle name"
                  value={details.middleName}
                  onChange={(e) =>
                    setDetails({ ...details, middleName: e.target.value })
                  }
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="..."
            render={() => (
              <FormItem>
                <Input
                  value={details.lastName}
                  onChange={(e) =>
                    setDetails({ ...details, lastName: e.target.value })
                  }
                  placeholder="Last name"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="..."
            render={() => (
              <FormItem>
                <Input
                  value={details.contactNumber}
                  onChange={(e) =>
                    setDetails({ ...details, contactNumber: e.target.value })
                  }
                  placeholder="Contact number"
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex gap-4">
        <Button onClick={() => setStep(1)} variant="secondary">
          <ArrowLeft />
        </Button>
        <Button
          onClick={() => {
            if (
              !details.firstName ||
              !details.lastName ||
              !details.contactNumber ||
              !details.middleName
            ) {
              toast.error("Please fill in all fields");

              return;
            }

            setStep(3);
          }}
        >
          <ArrowRight />
        </Button>
      </div>
    </MotionWrapper>
  );
};

export default RegisterForm1;
