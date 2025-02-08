"use client";

import { useEffect, useState } from "react";
import RoleSelector from "./role-selector";
import Step from "../ui/step";
import { Role } from "@/types";
import { AnimatePresence } from "motion/react";
import LoginForm from "./login-form";

const LoginSteps = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>();

  useEffect(() => {}, [role]);

  return (
    <section className="flex flex-col justify-between h-full w-full">
      <div className="h-full flex items-center w-full">
        <AnimatePresence mode="popLayout" initial={false}>
          {step === 1 ? (
            <div key="role">
              <RoleSelector setStep={() => setStep(2)} setRole={setRole} />
            </div>
          ) : (
            <div key="form" className="w-full">
              <LoginForm setStep={setStep} />
            </div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-1">
        <Step step={1} currentStep={step} />
        <Step step={2} currentStep={step} />
      </div>
    </section>
  );
};

export default LoginSteps;
