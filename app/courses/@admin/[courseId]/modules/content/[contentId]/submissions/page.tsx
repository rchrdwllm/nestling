import SubmissionGrid from "@/components/shared/courses-page/submissions/submission-grid";
import ErrorToast from "@/components/ui/error-toast";
import { getModuleContent } from "@/lib/content";
import Searcher from "@/components/shared/search/general-search/searcher";

const SubmissionsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ contentId: string }>;
  searchParams: Promise<{
    studentId: string | undefined;
    attempt: string | undefined;
    query?: string;
    page?: string;
    tab?: string;
  }>;
}) => {
  const { contentId } = await params;
  const { studentId, attempt, query, page, tab } = await searchParams;
  const { success: content, error: contentError } = await getModuleContent(
    contentId
  );

  if (contentError || !content) {
    return (
      <ErrorToast error={"Error fetching content: " + (contentError || "")} />
    );
  }
  return (
    <main className="flex flex-col gap-4 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold text-3xl">
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
