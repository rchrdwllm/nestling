import PdfViewer from "@/components/shared/content-page/pdf-viewer";
import { Button } from "@/components/ui/button";
import { getContentFile, getModuleContent } from "@/lib/content";
import Link from "next/link";

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
        <Link
          href={`/instructor-courses/${content.courseId}/modules/content/${contentId}/submissions`}
        >
          <Button variant="link">View submissions</Button>
        </Link>
      )}
    </main>
  );
};

export default ContentPage;
