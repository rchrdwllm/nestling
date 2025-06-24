import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { projectPriorities } from "@/constants/project";
import { Task } from "@/types";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { isPast } from "date-fns";
import { cn, getDueText } from "@/lib/utils";
import { getProjectById } from "@/lib/project";
import ErrorToast from "@/components/ui/error-toast";
import ClickableProjectBadge from "./clickable-project-badge";

const UpcomingTaskCard = async ({
  title,
  projectId,
  endDate,
  description,
  priority,
}: Task) => {
  const projectPriority = projectPriorities.find((p) => p.value === priority)!;
  const dueDate = getDueText(endDate!);
  const { success: project, error: projectError } = await getProjectById(
    projectId
  );

  if (projectError || !project) {
    return <ErrorToast error={"Error fetching project: " + projectError} />;
  }

  return (
    <Link href={`/projects/${projectId}`}>
      <Card className="flex flex-col gap-2 hover:shadow-md p-4 transition-shadow">
        <div>
          <h3 className="font-medium">{title}</h3>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ClickableProjectBadge
            projectId={projectId}
            projectTitle={project.title}
          />
          <Badge style={{ backgroundColor: projectPriority.color }}>
            {projectPriority.name}
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
