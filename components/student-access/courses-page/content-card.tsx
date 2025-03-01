import { Content } from "@/types";
import Link from "next/link";
import { ScrollText } from "lucide-react";

const ContentCard = ({ id, courseId, title }: Content) => {
  return (
    <Link
      href={`/student-courses/${courseId}/modules/content/${id}`}
      className="inline-flex items-center gap-3"
    >
      <span>
        <ScrollText className="size-4" />
      </span>
      <h1>{title}</h1>
    </Link>
  );
};

export default ContentCard;
