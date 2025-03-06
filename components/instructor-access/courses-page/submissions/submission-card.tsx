"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Submission } from "@/types";
import { useMemo } from "react";

type SubmissionCardProps = {
  submission: Submission;
  selectedSubmission: Submission;
  setSelectedSubmission: (submission: Submission) => void;
};

const SubmissionCard = ({
  submission,
  selectedSubmission,
  setSelectedSubmission,
}: SubmissionCardProps) => {
  const isActive = useMemo(() => {
    return selectedSubmission.id === submission.id;
  }, [selectedSubmission, submission]);

  return (
    <Button
      variant="link"
      onClick={() => setSelectedSubmission(submission)}
      className={cn(
        isActive && "text-primary underline",
        "p-0 text-left block w-full"
      )}
    >
      {submission.studentName}
    </Button>
  );
};

export default SubmissionCard;
