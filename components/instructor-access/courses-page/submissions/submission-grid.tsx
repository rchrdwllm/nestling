import { Submission } from "@/types";
import SubmissionPreview from "./submission-preview";
import { getEnrolledStudents } from "@/lib/course";
import { getModuleContent } from "@/lib/content";
import SubmissionCard from "./submission-card";
import { getAssignmentSubmissions } from "@/lib/submission";

type SubmissionGridProps = {
  studentId: string | undefined;
  contentId: string;
  attempt: string | undefined;
};

const SubmissionGrid = async ({
  studentId,
  contentId,
  attempt,
}: SubmissionGridProps) => {
  const { success: content, error: contentError } = await getModuleContent(
    contentId
  );
  const { success: submissions, error: submissionsError } =
    await getAssignmentSubmissions(contentId);

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

  return (
    <div className="flex gap-8">
      {studentId ? (
        <SubmissionPreview
          attempt={attempt}
          studentId={studentId}
          contentId={contentId}
          submissionType={content.submissionType!}
        />
      ) : (
        <div className="flex-1"></div>
      )}
      <div className="min-w-64">
        <h1 className="font-semibold">Student submissions</h1>
        <div className="flex flex-col items-start gap-2 mt-4">
          {enrolledStudents.map((student) => {
            const studentSubmissions = submissions.some(
              (submission: Submission) => submission.studentId === student.id
            );

            return (
              <SubmissionCard
                noSubmission={!studentSubmissions}
                key={student.id}
                {...student}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubmissionGrid;
