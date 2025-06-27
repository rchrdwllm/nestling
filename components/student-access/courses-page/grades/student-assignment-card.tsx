import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ErrorToast from "@/components/ui/error-toast";
import { getLatestAssignmentSubmission } from "@/lib/submission";
import { getOptimisticUser } from "@/lib/user";
import { Content } from "@/types";
import Link from "next/link";

type StudentAssignmentCardProps = Content;

const StudentAssignmentCard = async ({
  title,
  id,
  courseId,
  points,
  isGraded,
}: StudentAssignmentCardProps) => {
  const user = await getOptimisticUser();
  const { success: submission, error: submissionError } =
    await getLatestAssignmentSubmission(id, user.id);

  if (submissionError || !submission) {
    return (
      <Card className="flex justify-between items-center p-4">
        <Link href={`/courses/${courseId}/modules/content/${id}`}>
          <Button variant="link" className="p-0">
            {title}
          </Button>
        </Link>
        <p className="text-sm">No submission yet</p>
      </Card>
    );
  }

  return (
    <Card className="flex justify-between items-center p-4">
      <Link href={`/courses/${courseId}/modules/content/${id}`}>
        <Button variant="link" className="p-0">
          {title}
        </Button>
      </Link>
      {submission ? (
        isGraded ? (
          submission.grade != null ? (
            <p className="text-sm">
              {submission.grade} out of {points} points
            </p>
          ) : (
            <p className="text-sm">Not yet graded</p>
          )
        ) : (
          <p className="text-sm">Grading not required</p>
        )
      ) : (
        <p className="text-sm">No submission yet</p>
      )}
    </Card>
  );
};

export default StudentAssignmentCard;
