"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type SubmissionCardProps = User & {
  noSubmission: boolean;
};

const SubmissionCard = ({
  id: studentId,
  name,
  noSubmission,
}: SubmissionCardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = useMemo(() => {
    return studentId === searchParams.get("studentId");
  }, [studentId, searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Button
      variant="link"
      onClick={() =>
        router.push(`${pathname}?${createQueryString("studentId", studentId)}`)
      }
      className={cn(
        isActive && "text-primary underline",
        "p-0 text-left block w-full"
      )}
      disabled={noSubmission}
    >
      {name}
    </Button>
  );
};

export default SubmissionCard;
