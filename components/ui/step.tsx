import { cn } from "@/lib/utils";

type StepProps = { step: number; currentStep: number };

const Step = ({ step, currentStep }: StepProps) => {
  return (
    <div
      className={cn(
        "w-12 h-2 rounded-full bg-muted transition-colors",
        currentStep >= step ? "bg-primary" : "bg-muted"
      )}
    />
  );
};

export default Step;
