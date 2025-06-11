"use client";

import { useState } from "react";
import RoleSelector from "./role-selector";
import Step from "@/components/ui/step";
import { Role } from "@/types";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RegisterForm1 from "./register-form-1";
import RegisterForm2 from "./register-form-2";

const RegisterSteps = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>("student");
  const [details, setDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNumber: "",
    address: "",
  });

  return (
    <section className="flex flex-col items-center justify-between flex-1 h-full w-full overflow-x-hidden">
      <div className="h-full flex items-center w-full overflow-x-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          {step === 1 ? (
            <div key="role" className="w-full">
              <RoleSelector setStep={() => setStep(2)} setRole={setRole} />
            </div>
          ) : step === 2 ? (
            <div key="form-1" className="w-full">
              <RegisterForm1
                details={details}
                setDetails={setDetails}
                setStep={setStep}
              />
            </div>
          ) : (
            <div key="form-2" className="w-full">
              <RegisterForm2 details={details} role={role} setStep={setStep} />
            </div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-1 mt-8">
        <Step step={1} currentStep={step} />
        <Step step={2} currentStep={step} />
        <Step step={3} currentStep={step} />
      </div>
      <Link href="/api/auth/signin" className="mt-4">
        <Button
          variant="link"
          className="text-muted-foreground hover:text-primary"
        >
          Already have an account? Login
        </Button>
      </Link>
    </section>
  );
};

export default RegisterSteps;
