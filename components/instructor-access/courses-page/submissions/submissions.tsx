import { getAssignmentSubmissions } from "@/lib/submission";
import SubmissionCard from "./submission-card";

const Submissions = async ({ contentId }: { contentId: string }) => {
  const { success: submissions, error } = await getAssignmentSubmissions(
    contentId
  );

  if (error) {
    return <div>{error}</div>;
  }

  if (!submissions) {
    return <div>Loading...</div>;
  }

  console.log(submissions);

  return (
    <div>
      <h1 className="font-semibold">Submissions</h1>
      <div className="mt-4 flex flex-col gap-2">
        {submissions.map((submission) => (
          <SubmissionCard key={submission.id} {...submission} />
        ))}
      </div>
    </div>
  );
};

export default Submissions;
