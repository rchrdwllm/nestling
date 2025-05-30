import DateDisplay from "@/components/ui/date-display";
import { Content } from "@/types";
import { Calendar } from "lucide-react";
import Link from "next/link";

const StudentTaskCard = ({
  id,
  title,
  courseId,
  startDate,
  endDate,
}: Content) => {
  return (
    <Link
      href={`/courses/${courseId}/modules/content/${id}`}
      className="text-sm cursor-pointer"
    >
      <h1 className="font-medium">{title}</h1>
      <p className="text-muted-foreground">
        <Calendar className="size-4" /> <DateDisplay date={startDate!} /> -{" "}
        <Calendar className="size-4" /> <DateDisplay date={endDate!} />
      </p>
    </Link>
  );
};

export default StudentTaskCard;
