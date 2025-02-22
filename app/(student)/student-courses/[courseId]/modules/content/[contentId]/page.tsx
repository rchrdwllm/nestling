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
    <div>
      <h1>{content.title}</h1>
    </div>
  );
};

export default ContentPage;
