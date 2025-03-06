"use client";

import { Submission } from "@/types";
import { useState } from "react";
import SubmissionPreview from "./submission-preview";
import SubmissionCard from "./submission-card";

type SubmissionGridProps = {
  submissions: Submission[];
};

const SubmissionGrid = ({ submissions }: SubmissionGridProps) => {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission>(
    submissions[0]
  );

  return (
    <div className="flex gap-8">
      <SubmissionPreview submission={selectedSubmission} />
      <div className="min-w-64">
        <h1 className="font-semibold">Student submissions</h1>
        <div className="flex flex-col items-start gap-2 mt-4">
          {submissions.map((submission) => (
            <SubmissionCard
              key={submission.id}
              selectedSubmission={selectedSubmission}
              submission={submission}
              setSelectedSubmission={setSelectedSubmission}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmissionGrid;
