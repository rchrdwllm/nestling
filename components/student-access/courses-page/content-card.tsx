import { Content } from "@/types";
import Link from "next/link";
import { ScrollText, FilePen, Paperclip } from "lucide-react";

const ContentCard = ({ id, courseId, title, type }: Content) => {
  const Icon =
    type === "lesson"
      ? ScrollText
      : type === "assignment"
      ? FilePen
      : Paperclip;

  return (
    <Link
      href={`/student-courses/${courseId}/modules/content/${id}`}
      className="inline-flex items-center gap-3"
    >
      <span>
        <Icon className="size-4" />
      </span>
      <h1>{title}</h1>
    </Link>
  );
};

export default ContentCard;
