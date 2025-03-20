import SubmissionPreview from "@/components/shared/content-page/submission-preview";
import { getEnrolledStudents } from "@/lib/course";
import { getModuleContent } from "@/lib/content";
import {
  getAssignmentSubmissions,
  getStudentAssignmentSubmission,
} from "@/lib/submission";
import { getOptimisticUser } from "@/lib/user";

type SubmissionGridProps = {
  studentId: string | undefined;
  contentId: string;
  attempt: string | undefined;
};

const SubmissionGrid = async ({ contentId, attempt }: SubmissionGridProps) => {
  const { success: content, error: contentError } = await getModuleContent(
    contentId
  );
  const { success: submissions, error: submissionsError } =
    await getAssignmentSubmissions(contentId);
  const user = await getOptimisticUser();

  if (contentError || submissionsError) {
    return <div>{contentError}</div>;
  }

  if (!content || !submissions) {
    return <div>Loading...</div>;
  }

  const { success: enrolledStudents, error: enrolledStudentsError } =
    await getEnrolledStudents(content.courseId);

  if (enrolledStudentsError) {
    return <div>{enrolledStudentsError}</div>;
  }

  if (!enrolledStudents) {
    return <div>Loading...</div>;
  }

  const { success: studentSubmissions } = await getStudentAssignmentSubmission(
    contentId,
    user.id
  );

  return (
    <div className="flex gap-8">
      <SubmissionPreview
        attempt={attempt}
        studentId={user.id}
        contentId={contentId}
        submissionType={content.submissionType!}
      />
    </div>
  );
};

export default SubmissionGrid;
