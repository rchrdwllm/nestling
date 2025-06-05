import SubmissionGrid from "@/components/shared/courses-page/submissions/submission-grid";
import ErrorToast from "@/components/ui/error-toast";
import { getModuleContent } from "@/lib/content";

const SubmissionsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ contentId: string }>;
  searchParams: Promise<{
    studentId: string | undefined;
    attempt: string | undefined;
  }>;
}) => {
  const { contentId } = await params;
  const { studentId, attempt } = await searchParams;
  const { success: content, error: contentError } = await getModuleContent(
    contentId
  );

  if (contentError || !content) {
    return (
      <ErrorToast error={"Error fetching content: " + (contentError || "")} />
    );
  }

  return (
    <main className="p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">
          Submissions for {content.title}
        </h1>
        <hr />
      </div>
      <SubmissionGrid
        contentId={contentId}
        studentId={studentId}
        attempt={attempt}
      />
    </main>
  );
};

export default SubmissionsPage;
