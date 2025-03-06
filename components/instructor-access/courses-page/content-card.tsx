import { Content } from "@/types";
import Link from "next/link";
import { ScrollText, FilePen, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContentCard = ({ id, courseId, title, type }: Content) => {
  const Icon =
    type === "lesson"
      ? ScrollText
      : type === "assignment"
      ? FilePen
      : Paperclip;

  return (
    <Link
      className="block"
      href={`/instructor-courses/${courseId}/modules/content/${id}`}
    >
      <Button
        variant="link"
        className="text-left inline-flex justify-start items-center gap-3 p-0 w-full"
      >
        <span>
          <Icon className="size-4" />
        </span>
        <h1>{title}</h1>
      </Button>
    </Link>
  );
};

export default ContentCard;
