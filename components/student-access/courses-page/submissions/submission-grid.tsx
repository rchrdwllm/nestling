import SubmissionPreview from "@/components/shared/content-page/submission-preview";
import { getEnrolledStudents } from "@/lib/course";
import { getModuleContent } from "@/lib/content";
import {
  getAssignmentSubmissions,
  getStudentAssignmentSubmission,
} from "@/lib/submission";
import { getOptimisticUser } from "@/lib/user";
import ErrorToast from "@/components/ui/error-toast";

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

  if (contentError || !content || submissionsError || !submissions) {
    return (
      <ErrorToast
        error={
          "Error fetching submission data: " +
          (contentError || submissionsError || "")
        }
      />
    );
  }

  const { success: enrolledStudents, error: enrolledStudentsError } =
    await getEnrolledStudents(content.courseId);

  if (enrolledStudentsError || !enrolledStudents) {
    return (
      <ErrorToast
        error={"Error fetching enrolled students: " + enrolledStudentsError}
      />
    );
  }

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
