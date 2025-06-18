import { Content } from "@/types";
import Link from "next/link";
import { ScrollText, FilePen, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublishContentSwitch from "./publish-content-switch";
import ContentDetailsBtn from "./content-details-btn";

const ContentCard = ({
  id,
  courseId,
  title,
  type,
  isPublished,
  moduleId,
}: Content) => {
  const Icon =
    type === "lesson"
      ? ScrollText
      : type === "assignment"
      ? FilePen
      : Paperclip;

  return (
    <article className="flex justify-between items-center gap-4">
      <Link
        className="block flex-1"
        href={`/courses/${courseId}/modules/content/${id}`}
      >
        <Button
          variant="link"
          className="inline-flex flex-1 justify-start items-center gap-3 p-0 w-full text-left"
        >
          <span>
            <Icon className="size-4" />
          </span>
          <h1>{title}</h1>
        </Button>
      </Link>
      <PublishContentSwitch defaultPublished={isPublished} contentId={id} />
      <ContentDetailsBtn
        contentId={id}
        moduleId={moduleId}
        courseId={courseId}
      />
    </article>
  );
};

export default ContentCard;
