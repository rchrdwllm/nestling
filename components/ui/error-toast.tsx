"use client";

import { useEffect } from "react";
import { toast } from "sonner";

type ErrorToastProps = {
  error: any;
};

const ErrorToast = ({ error }: ErrorToastProps) => {
  useEffect(() => {
    if (error) {
      console.error(error);

      toast.dismiss();
      toast.error(JSON.stringify(error));
    } else {
      toast.dismiss();
    }
  }, [error]);

  return null;
};

export default ErrorToast;
