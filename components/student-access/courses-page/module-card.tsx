import { getModuleContents } from "@/lib/content";
import { Module } from "@/types";
import ContentCard from "./content-card";
import CreateContentBtn from "@/components/instructor-access/courses-page/create-content-btn";

const ModuleCard = async ({ id, title, moduleNumber }: Module) => {
  const { success: contents, error } = await getModuleContents(id);

  if (error) {
    return <div>{error}</div>;
  }

  if (!contents) {
    return <div>Loading...</div>;
  }

  return (
    <article className="border border-border rounded-xl p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">
          {moduleNumber}. {title}
        </h1>
        <CreateContentBtn moduleTitle={title} moduleId={id} />
      </div>
      <div>
        {contents.length ? (
          contents.map((content) => (
            <ContentCard key={content.id} {...content} />
          ))
        ) : (
          <p className="text-muted-foreground">No content found</p>
        )}
      </div>
    </article>
  );
};

export default ModuleCard;
