import { Button } from "@/components/ui/button";
import Link from "next/link";

type StudentSubmissionProps = {
  courseId: string;
  contentId: string;
};

const StudentSubmission = ({ contentId, courseId }: StudentSubmissionProps) => {
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
