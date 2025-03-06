import { getAssignmentSubmissions } from "@/lib/submission";
import SubmissionGrid from "./submission-grid";
import { getUserById } from "@/lib/user";

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

  const asdf = await Promise.all(
    submissions.map(async (submission) => {
      const user = await getUserById(submission.userId);

      return user;
    })
  );

  return <SubmissionGrid submissions={submissions} />;
};

export default Submissions;
