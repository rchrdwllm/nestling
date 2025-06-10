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
      className="bg-muted after:bg-primary relative rounded-md flex flex-col gap-1 p-2 pl-6 cursor-pointer text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
    >
      <h1 className="font-medium">{title}</h1>
      <p className="text-muted-foreground text-xs">
        <Calendar className="size-3 inline mb-1" />{" "}
        <DateDisplay date={startDate!} /> -{" "}
        <Calendar className="size-3 inline mb-1" />{" "}
        <DateDisplay date={endDate!} />
      </p>
    </Link>
  );
};

export default StudentTaskCard;
