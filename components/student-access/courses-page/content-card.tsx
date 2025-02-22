import { Content } from "@/types";
import Link from "next/link";

const ContentCard = ({ id, courseId, title }: Content) => {
  return (
    <Link href={`/student-courses/${courseId}/modules/content/${id}`}>
      <h1>{title}</h1>
    </Link>
  );
};

export default ContentCard;
