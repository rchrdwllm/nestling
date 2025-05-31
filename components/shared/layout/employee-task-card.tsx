import DateDisplay from "@/components/ui/date-display";
import { Task } from "@/types";
import { Calendar } from "lucide-react";
import Link from "next/link";

const EmployeeTaskCard = ({ title, projectId, startDate, endDate }: Task) => {
  return (
    <Link
      href={`/projects/${projectId}`}
      className="text-sm cursor-pointer flex flex-col gap-1"
    >
      <h1 className="font-medium">{title}</h1>
      <p className="text-muted-foreground flex items-center gap-2">
        <Calendar className="size-3" /> <DateDisplay date={startDate} /> -{" "}
        <Calendar className="size-3" /> <DateDisplay date={endDate} />
      </p>
    </Link>
  );
};

export default EmployeeTaskCard;
