import Submissions from "@/components/instructor-access/courses-page/submissions/submissions";
import { getModuleContent } from "@/lib/content";
import { Suspense } from "react";

const SubmissionsPage = async ({
  params,
}: {
  params: Promise<{ contentId: string }>;
}) => {
  const { contentId } = await params;
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
          Submissions for {content.title}
        </h1>
        <hr />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Submissions contentId={contentId} />
      </Suspense>
    </main>
  );
};

export default SubmissionsPage;
