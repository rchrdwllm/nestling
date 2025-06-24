import PdfViewer from "@/components/shared/content-page/pdf-viewer";
import SubmitAssignmentBtn from "@/components/student-access/courses-page/assignment-content/submit-assignment-btn";
import AssignmentDetails from "@/components/student-access/courses-page/assignment-content/assignment-details";
import {
  getContentFile,
  getModuleContent,
  getModuleContents,
} from "@/lib/content";
import { getStudentAssignmentSubmission } from "@/lib/submission";
import { getOptimisticUser } from "@/lib/user";
import StudentSubmission from "@/components/student-access/courses-page/student-submission";
import ContentViewLogger from "@/components/shared/content-page/content-view-logger";
import ErrorToast from "@/components/ui/error-toast";
import Searcher from "@/components/shared/search/general-search/searcher";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ContentPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ contentId: string }>;
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { contentId } = await params;
  const { query, page, tab } = (await searchParams) || {};
  const { success: content, error: contentError } = await getModuleContent(
    contentId
  );
  const user = await getOptimisticUser();

  if (contentError || !content) {
    return <ErrorToast error={"Error fetching content: " + contentError} />;
  }

  const file = content.type === "file" ? await getContentFile(contentId) : null;
  const { success: submissions } =
    content.type === "assignment"
      ? await getStudentAssignmentSubmission(contentId, user.id)
      : { success: null };

  const startDate =
    content.type === "assignment" ? new Date(content.startDate!) : new Date();
  const endDate =
    content.type === "assignment" ? new Date(content.endDate!) : new Date();
  const currentDate = content.type === "assignment" ? new Date() : new Date();

  const isLocked = currentDate < startDate || currentDate > endDate || false;

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

  if (isLocked) {
    return (
      <main className="flex flex-col gap-8 p-6">
        <section className="flex gap-8">
          <ContentViewLogger content={content} />
          <Searcher query={query} page={page} tab={tab} />
          <div>
            <div className="flex flex-col gap-3">
              <h1 className="font-semibold text-3xl">{content.title}</h1>
              <hr />
            </div>
            {content.type === "assignment" && (
              <AssignmentDetails
                {...content}
                submissionsLength={submissions!.length}
              />
            )}
            <p className="mt-4">
              This content is locked. Please check the start and end dates to
              see when it will be available.
            </p>
          </div>
          {submissions?.length ? (
            <StudentSubmission
              courseId={content.courseId}
              contentId={content.id}
            />
          ) : null}
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
  }

  return (
    <main className="flex flex-col gap-8 p-6">
      <section className="flex gap-8">
        <ContentViewLogger content={content} />
        <Searcher query={query} page={page} tab={tab} />
        <div className="flex-1">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-3xl">{content.title}</h1>
              {content.type === "assignment" && (
                <SubmitAssignmentBtn
                  submissionType={content.submissionType!}
                  contentId={contentId}
                  submissionsLength={submissions!.length}
                  maxAttempts={content.maxAttempts}
                />
              )}
            </div>
            <hr />
          </div>
          {content.type === "assignment" && (
            <AssignmentDetails
              {...content}
              submissionsLength={submissions!.length}
            />
          )}
          <div
            className="flex flex-col gap-4 mt-6"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
          {file && <PdfViewer pdfUrl={file.success?.secure_url!} />}
        </div>
        {submissions?.length ? (
          <StudentSubmission
            courseId={content.courseId}
            contentId={content.id}
          />
        ) : null}
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
