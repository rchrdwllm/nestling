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
import ErrorToast from "@/components/ui/error-toast";

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
    return (
      <ErrorToast
        error={"Error fetching student submission" + submissionError}
      />
    );
  }

  return (
    <article className="flex justify-between items-center h-10">
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
