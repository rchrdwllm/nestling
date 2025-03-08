"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type SubmissionAttemptProps = {
  index: number;
};

const SubmissionAttempt = ({ index }: SubmissionAttemptProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stringIndex = index.toString();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const isActive = useMemo(() => {
    return stringIndex === (searchParams.get("attempt") ?? "0");
  }, [index, searchParams]);

  return (
    <Button
      variant="link"
      onClick={() =>
        router.push(`${pathname}?${createQueryString("attempt", stringIndex)}`)
      }
      className={cn(
        isActive && "text-primary underline",
        "p-0 text-left block w-full"
      )}
    >
      Attempt {index + 1}
    </Button>
  );
};

export default SubmissionAttempt;
