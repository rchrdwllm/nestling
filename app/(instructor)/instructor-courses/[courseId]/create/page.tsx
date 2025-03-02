import CreateContentForm from "@/components/instructor-access/courses-page/create-content/create-content-form";
import { getModuleTitles } from "@/lib/module";

const CreatePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ moduleId?: string }>;
}) => {
  const { courseId } = await params;
  const { moduleId } = await searchParams;
  const { success: moduleTitles, error } = await getModuleTitles(courseId);

  if (error) {
    return <div>{error}</div>;
  }

  if (!moduleTitles) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">
          {moduleId ? "Add content" : "Create content"}{" "}
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
