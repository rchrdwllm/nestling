import CreateContentForm from "@/components/shared/courses-page/create-content/create-content-form";
import ErrorToast from "@/components/ui/error-toast";
import { getContentFile, getModuleContent } from "@/lib/content";
import { getModuleTitles } from "@/lib/module";
import Searcher from "@/components/shared/search/general-search/searcher";

const CreatePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{
    moduleId?: string;
    contentId?: string;
    query?: string;
    page?: string;
    tab?: string;
  }>;
}) => {
  const { courseId } = await params;
  const { moduleId, contentId, query, page, tab } = await searchParams;
  const { success: moduleTitles, error } = await getModuleTitles(courseId);

  if (error || !moduleTitles) {
    return (
      <ErrorToast error={"Error fetching module titles: " + (error || "")} />
    );
  }

  const { success: content, error: contentError } = contentId
    ? await getModuleContent(contentId)
    : { success: null, error: null };

  if (contentError) {
    return (
      <ErrorToast error={"Error fetching content: " + (contentError || "")} />
    );
  }

  if (contentId) {
    const { success: file, error: fileError } = await getContentFile(contentId);

    if (fileError) {
      return (
        <ErrorToast
          error={"Error fetching content file: " + (fileError || "")}
        />
      );
    }

    return (
      <main className="flex flex-col gap-8 p-6">
        <Searcher query={query} page={page} tab={tab} />
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-3xl">Edit content</h1>
          <hr />
        </div>
        <CreateContentForm
          defaultModule={moduleId}
          courseId={courseId}
          modules={moduleTitles}
          content={JSON.stringify(content)}
          contentFile={file}
        />
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-8 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold text-3xl">
          {moduleId ? "Add content" : "Create content"}
        </h1>
        <hr />
      </div>
      <CreateContentForm
        defaultModule={moduleId}
        courseId={courseId}
        modules={moduleTitles}
      />
    </main>
  );
};

export default CreatePage;
