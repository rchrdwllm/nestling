import AssignmentDetails from "@/components/shared/courses-page/assignment-content/assignment-details";
import PdfViewer from "@/components/shared/content-page/pdf-viewer";
import { Button } from "@/components/ui/button";
import { getContentFile, getModuleContent } from "@/lib/content";
import Link from "next/link";
import { getOptimisticUser } from "@/lib/user";
import ContentViewLogger from "@/components/shared/content-page/content-view-logger";

const ContentPage = async ({
  params,
}: {
  params: Promise<{ contentId: string; courseId: string }>;
}) => {
  const { contentId, courseId } = await params;
  const { success: content, error } = await getModuleContent(contentId);
  const user = await getOptimisticUser();

  if (error) {
    return <div>{error}</div>;
  }

  if (!content) {
    return <div>Loading...</div>;
  }

  const file = content.type === "file" ? await getContentFile(contentId) : null;

  return (
    <main className="p-6 flex gap-16">
      <ContentViewLogger content={content} />
      <div className="flex-1">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">{content.title}</h1>
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
