import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  getLatestAssignmentSubmission,
  getStudentAssignmentSubmission,
} from "@/lib/submission";
import { Content } from "@/types";
import Link from "next/link";
import GradeStudentForm from "./grade-student-form";

type AssignmentCardProps = Content & {
  studentId: string;
};

const AssignmentCard = async ({
  title,
  id,
  courseId,
  studentId,
  points,
}: AssignmentCardProps) => {
  const { success: submission, error: submissionError } =
    await getLatestAssignmentSubmission(id, studentId);

  if (submissionError) {
    console.error("Error fetching student submissions: ", submissionError);

    return <h1>Error fetching student submissions</h1>;
  }

  return (
    <article className="h-10 flex justify-between items-center">
      <Link href={`/courses/${courseId}/modules/content/${id}`}>
        <Button variant="link" className="p-0">
          {title}
        </Button>
      </Link>
      {submission ? (
        <GradeStudentForm
          grade={submission.grade?.toString() || undefined}
          submissionId={submission.id}
          points={points!}
          contentId={submission.contentId}
          studentId={studentId}
        />
      ) : (
        <p className="text-sm">No submission</p>
      )}
    </article>
  );
};

export default AssignmentCard;
