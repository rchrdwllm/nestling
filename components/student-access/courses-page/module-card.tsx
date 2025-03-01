import { getModuleContents } from "@/lib/content";
import { Module } from "@/types";
import ContentCard from "./content-card";

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
      <h1 className="text-xl font-medium">
        {moduleNumber}. {title}
      </h1>
      <div>
        {contents.map((content) => (
          <ContentCard key={content.id} {...content} />
        ))}
      </div>
    </article>
  );
};

export default ModuleCard;
