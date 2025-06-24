import AssignmentDetails from "@/components/shared/courses-page/assignment-content/assignment-details";
import PdfViewer from "@/components/shared/content-page/pdf-viewer";
import { Button } from "@/components/ui/button";
import {
  getContentFile,
  getModuleContent,
  getModuleContents,
} from "@/lib/content";
import Link from "next/link";
import { getOptimisticUser } from "@/lib/user";
import ContentViewLogger from "@/components/shared/content-page/content-view-logger";
import ErrorToast from "@/components/ui/error-toast";
import Searcher from "@/components/shared/search/general-search/searcher";
import DeleteContentBtn from "@/components/shared/content-page/delete-content-btn";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    return <ErrorToast error={"Error fetching content: " + error} />;
  }

  const file = content.type === "file" ? await getContentFile(contentId) : null;

  const { success: allContents, error: allContentsError } =
    await getModuleContents(content.moduleId);

  if (allContentsError || !allContents) {
    return (
      <ErrorToast
        error={"Error fetching module contents: " + allContentsError}
      />
    );
  }

  const currentIdx = allContents?.findIndex((c) => c.id === contentId) ?? -1;
  const prevContent = currentIdx > 0 ? allContents[currentIdx - 1] : null;
  const nextContent =
    allContents && currentIdx < allContents.length - 1
      ? allContents[currentIdx + 1]
      : null;

  return (
    <main className="flex flex-col gap-8 p-6">
      <section className="flex gap-16">
        <ContentViewLogger content={content} />
        <Searcher query={query} page={page} tab={tab} />
        <div className="flex-1">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center gap-4">
              <h1 className="flex-1 font-semibold text-3xl">{content.title}</h1>
              <DeleteContentBtn contentId={contentId} />
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
      </section>
      {(prevContent || nextContent) && (
        <>
          <hr />
          <section className="flex justify-between items-center">
            {prevContent && (
              <Link
                href={`/courses/${content.courseId}/modules/content/${prevContent.id}`}
              >
                <Button variant="outline">
                  <ChevronLeft className="size-4" /> Previous
                </Button>
              </Link>
            )}
            {nextContent && (
              <Link
                href={`/courses/${content.courseId}/modules/content/${nextContent.id}`}
                className="justify-self-end ml-auto"
              >
                <Button variant="outline">
                  Next <ChevronRight className="size-4" />
                </Button>
              </Link>
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default ContentPage;
