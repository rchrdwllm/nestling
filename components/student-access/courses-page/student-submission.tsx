import { Button } from "@/components/ui/button";
import { Submission } from "@/types";
import Link from "next/link";

type StudentSubmissionProps = {
  submissions: Submission[];
  courseId: string;
  contentId: string;
};

const StudentSubmission = ({
  submissions,
  contentId,
  courseId,
}: StudentSubmissionProps) => {
  return (
    <div>
      <Link
        href={`/student-courses/${courseId}/modules/content/${contentId}/submissions`}
      >
        <Button variant="link">Submission details</Button>
      </Link>
    </div>
  );
};

export default StudentSubmission;
