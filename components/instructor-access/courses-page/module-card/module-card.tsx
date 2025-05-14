import { getModuleContents } from "@/lib/content";
import { Module } from "@/types";
import ContentCard from "../content-card/content-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PublishModuleSwitch from "./publish-module-switch";
import ModuleDetailsBtn from "./module-details-btn";
import { getModule } from "@/lib/module";

const ModuleCard = async ({
  id,
  title,
  moduleNumber,
  courseId,
  isPublished,
}: Module) => {
  const { success: contents, error } = await getModuleContents(id);
  const { success: module, error: moduleError } = await getModule(id);

  if (error || moduleError) {
    return <div>{error}</div>;
  }

  if (!contents || !module) {
    return <div>Loading...</div>;
  }

  return (
    <article className="border shadow-sm transition-shadow hover:shadow-md border-border rounded-xl p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-xl flex-1 font-medium">
          {moduleNumber}. {title}
        </h1>
        <Link href={`/courses/${courseId}/create?moduleId=${id}`}>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <Plus className="size-4" />
            New content
          </Button>
        </Link>
        <PublishModuleSwitch defaultPublished={isPublished} moduleId={id} />
        <ModuleDetailsBtn module={JSON.stringify(module)} />
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
