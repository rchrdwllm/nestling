import { getAssignmentSubmissions } from "@/lib/submission";
import SubmissionGrid from "./submission-grid";

type SubmissionsProps = {
  contentId: string;
  submissionType: "file" | "text";
};

const Submissions = async ({ contentId, submissionType }: SubmissionsProps) => {
  const { success: submissions, error } = await getAssignmentSubmissions(
    contentId
  );

  if (error) {
    return <div>{error}</div>;
  }

  if (!submissions) {
    return <div>Loading...</div>;
  }

  return (
    <SubmissionGrid submissionType={submissionType} submissions={submissions} />
  );
};

export default Submissions;
