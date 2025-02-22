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
    <div>
      <h1>{title}</h1>
      <p>Module Number: {moduleNumber}</p>
      <div>
        {contents.map((content) => (
          <ContentCard key={content.id} {...content} />
        ))}
      </div>
    </div>
  );
};

export default ModuleCard;
