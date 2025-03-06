import { Content } from "@/types";
import Link from "next/link";
import { ScrollText, FilePen, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublishContentSwitch from "./publish-content-switch";

const ContentCard = ({ id, courseId, title, type, isPublished }: Content) => {
  const Icon =
    type === "lesson"
      ? ScrollText
      : type === "assignment"
      ? FilePen
      : Paperclip;

  return (
    <article className="flex justify-between items-center">
      <Link
        className="flex-1 block"
        href={`/instructor-courses/${courseId}/modules/content/${id}`}
      >
        <Button
          variant="link"
          className="text-left inline-flex justify-start items-center gap-3 p-0 w-full flex-1"
        >
          <span>
            <Icon className="size-4" />
          </span>
          <h1>{title}</h1>
        </Button>
      </Link>
      <PublishContentSwitch defaultPublished={isPublished} contentId={id} />
    </article>
  );
};

export default ContentCard;
