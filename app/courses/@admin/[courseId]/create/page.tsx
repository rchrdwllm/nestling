import CreateContentForm from "@/components/shared/courses-page/create-content/create-content-form";
import ErrorToast from "@/components/ui/error-toast";
import { getModuleContent } from "@/lib/content";
import { getModuleTitles } from "@/lib/module";

const CreatePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ moduleId?: string; contentId?: string }>;
}) => {
  const { courseId } = await params;
  const { moduleId, contentId } = await searchParams;
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

  return (
    <main className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">
          {moduleId
            ? "Add content"
            : content
            ? "Edit content"
            : "Create content"}
        </h1>
        <hr />
      </div>
      <CreateContentForm
        defaultModule={moduleId}
        courseId={courseId}
        modules={moduleTitles}
        content={JSON.stringify(content)}
      />
    </main>
  );
};

export default CreatePage;
