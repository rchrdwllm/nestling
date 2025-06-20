import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { projectPriorities } from "@/constants/project";
import { Task } from "@/types";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { differenceInCalendarDays, isToday, isPast } from "date-fns";
import { cn } from "@/lib/utils";

const UpcomingTaskCard = ({
  title,
  projectId,
  endDate,
  description,
  priority,
}: Task) => {
  const taskPriority = useMemo(
    () => projectPriorities.find((p) => p.value === priority)!,
    [priority]
  );
  const dueDate = useMemo(() => {
    if (!endDate) return "";

    const end = new Date(endDate);

    if (isToday(end)) {
      return "Due today";
    }

    if (isPast(end) && !isToday(end)) {
      return "Overdue";
    }

    const days = differenceInCalendarDays(end, new Date());
    return `Due in ${days} day${days === 1 ? "" : "s"}`;
  }, [endDate]);

  return (
    <Link href={`/projects/${projectId}`}>
      <Card className="flex flex-col gap-1 hover:shadow-md p-4 transition-shadow">
        <div>
          <h3 className="font-medium">{title}</h3>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge style={{ backgroundColor: taskPriority.color }}>
            {taskPriority.name}
          </Badge>
          <p
            className={cn(
              "flex flex-wrap items-center gap-1 text-muted-foreground text-xs",
              isPast(new Date(endDate!))
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Calendar className="size-3" /> <span>{dueDate}</span>
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default UpcomingTaskCard;
