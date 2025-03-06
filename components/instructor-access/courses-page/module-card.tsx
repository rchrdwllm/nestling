import { getModuleContents } from "@/lib/content";
import { Module } from "@/types";
import ContentCard from "./content-card/content-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ModuleCard = async ({ id, title, moduleNumber, courseId }: Module) => {
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
        <Link href={`/instructor-courses/${courseId}/create?moduleId=${id}`}>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <Plus className="size-4" />
            New content
          </Button>
        </Link>
      </div>
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
