import { Content } from "@/types";
import Link from "next/link";
import { ScrollText, FilePen } from "lucide-react";

const ContentCard = ({ id, courseId, title, type }: Content) => {
  return (
    <Link
      href={`/instructor-courses/${courseId}/modules/content/${id}`}
      className="inline-flex items-center gap-3"
    >
      <span>
        {type === "lesson" ? (
          <ScrollText className="size-4" />
        ) : (
          <FilePen className="size-4" />
        )}
      </span>
      <h1>{title}</h1>
    </Link>
  );
};

export default ContentCard;
