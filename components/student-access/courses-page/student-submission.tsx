import { Submission } from "@/types";

type StudentSubmissionProps = {
  submissions: Submission[];
};

const StudentSubmission = ({ submissions }: StudentSubmissionProps) => {
  return (
    <div>
      <h1 className="text-muted-foreground text-sm font-medium">
        Successfully submitted!
      </h1>
    </div>
  );
};

export default StudentSubmission;
