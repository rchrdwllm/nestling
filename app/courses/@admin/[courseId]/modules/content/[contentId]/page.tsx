import AssignmentDetails from "@/components/shared/courses-page/assignment-content/assignment-details";
import PdfViewer from "@/components/shared/content-page/pdf-viewer";
import { Button } from "@/components/ui/button";
import { getContentFile, getModuleContent } from "@/lib/content";
import Link from "next/link";
import ErrorToast from "@/components/ui/error-toast";
import Searcher from "@/components/shared/search/general-search/searcher";

const ContentPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ contentId: string; courseId: string }>;
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { contentId, courseId } = await params;
  const { query, page, tab } = (await searchParams) || {};
  const { success: content, error } = await getModuleContent(contentId);

  if (error || !content) {
    return <ErrorToast error={"Error fetching content: " + (error || "")} />;
  }

  const file = content.type === "file" ? await getContentFile(contentId) : null;
  return (
    <main className="flex gap-16 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex-1">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-3xl">{content.title}</h1>
            <Link
              href={`/courses/${courseId}/create?moduleId=${content.moduleId}&contentId=${contentId}`}
            >
              <Button variant="outline">Edit content</Button>
            </Link>
          </div>
          <hr />
        </div>
        {content.type === "assignment" && <AssignmentDetails {...content} />}
        <div
          className="flex flex-col gap-4 mt-6"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
        {file && <PdfViewer pdfUrl={file.success?.secure_url!} />}
      </div>
      {content.type === "assignment" && (
        <Link
          href={`/courses/${content.courseId}/modules/content/${contentId}/submissions`}
        >
          <Button variant="link">View submissions</Button>
        </Link>
      )}
    </main>
  );
};

export default ContentPage;
