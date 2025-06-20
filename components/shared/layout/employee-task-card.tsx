import DateDisplay from "@/components/ui/date-display";
import { Task } from "@/types";
import { Calendar } from "lucide-react";
import Link from "next/link";

const EmployeeTaskCard = ({ title, projectId, startDate, endDate }: Task) => {
  return (
    <Link
      href={`/projects/${projectId}`}
      className="after:left-2 after:absolute relative after:inset-y-2 flex flex-col gap-1 bg-muted-secondary/75 after:bg-primary hover:bg-muted-secondary hover:shadow-md p-2 pl-6 rounded-sm after:rounded-full after:w-1 text-sm transition-all cursor-pointer"
    >
      <h1 className="font-medium">{title}</h1>
      <p className="text-muted-foreground text-xs">
        <Calendar className="inline mb-1 size-3" />{" "}
        <DateDisplay date={startDate!} /> -{" "}
        <Calendar className="inline mb-1 size-3" />{" "}
        <DateDisplay date={endDate!} />
      </p>
    </Link>
  );
};

export default EmployeeTaskCard;
