import { Module } from "@/types";
import ContentCard from "./content-card";
import { getPublishedModuleContents } from "@/lib/content";

const ModuleCard = async ({ id, title, moduleNumber }: Module) => {
  const { success: contents, error } = await getPublishedModuleContents(id);

  if (error) {
    return <div>{error}</div>;
  }

  if (!contents) {
    return <div>Loading...</div>;
  }

  return (
    <article className="border border-border rounded-xl p-4 flex flex-col gap-4">
      <h1 className="text-xl font-medium">
        {moduleNumber}. {title}
      </h1>
      <div className="flex flex-col gap-2">
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
