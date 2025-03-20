import SubmissionGrid from "@/components/student-access/courses-page/submissions/submission-grid";
import { getModuleContent } from "@/lib/content";
import { Suspense } from "react";

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

  if (contentError) {
    return <div>{contentError}</div>;
  }

  if (!content) {
    return <div>Loading</div>;
  }

  return (
    <main className="p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">
          Submission Details - {content.title}
        </h1>
        <hr />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SubmissionGrid
          contentId={contentId}
          studentId={studentId}
          attempt={attempt}
        />
      </Suspense>
    </main>
  );
};

export default SubmissionsPage;
