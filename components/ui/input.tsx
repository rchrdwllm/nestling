import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  Icon?: any;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, Icon, type, ...props }, ref) => {
    return (
      <>
        <div className="relative w-full">
          <input
            type={type}
            className={cn(
              "flex w-full h-10 shadow-sm rounded-lg border border-input bg-background px-3 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors focus:border-primary",
              Icon ? "pl-8" : "pl-3",
              className
            )}
            ref={ref}
            {...props}
          />
          {Icon && (
            <Icon className=" absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground peer-focus:text-gray-900" />
          )}
        </div>
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
