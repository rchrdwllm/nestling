import { getModuleContent } from "@/lib/content";

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

  return (
    <main className="p-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">{content.title}</h1>
        <hr />
      </div>
      <div
        className="flex flex-col gap-4 mt-6"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
    </main>
  );
};

export default ContentPage;
