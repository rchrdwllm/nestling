import Submissions from "@/components/instructor-access/courses-page/submissions/submissions";
import PdfViewer from "@/components/shared/content-page/pdf-viewer";
import { getContentFile, getModuleContent } from "@/lib/content";
import { Suspense } from "react";

const ContentPage = async ({
  params,
}: {
  params: Promise<{ contentId: string }>;
}) => {
  const { contentId } = await params;
  const { success: content, error } = await getModuleContent(contentId);

  if (error) {
    return <div>{error}</div>;
  }

  if (!content) {
    return <div>Loading...</div>;
  }

  const file = content.type === "file" ? await getContentFile(contentId) : null;

  return (
    <main className="p-6 flex gap-16">
      <div className="flex-1">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">{content.title}</h1>
          <hr />
        </div>
        <div
          className="flex flex-col gap-4 mt-6"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
        {file && <PdfViewer pdfUrl={file.success?.secure_url!} />}
      </div>
      {content.type === "assignment" && (
        <div>
          <h1 className="font-semibold">Submissions</h1>
          <div className="mt-4">
            <Suspense fallback="Loading...">
              <Submissions contentId={contentId} />
            </Suspense>
          </div>
        </div>
      )}
    </main>
  );
};

export default ContentPage;
