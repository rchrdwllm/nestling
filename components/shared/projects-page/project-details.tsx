"use client";

import { Button } from "@/components/ui/button";
import DateDisplay from "@/components/ui/date-display";
import { projectPriorities, projectStatuses } from "@/constants/project";
import { Project, User } from "@/types";
import { Calendar, Flame, TrendingUp, UserIcon } from "lucide-react";

type ProjectDetailsProps = {
  project: Project;
  owner: User;
};

const ProjectDetails = ({ project, owner }: ProjectDetailsProps) => {
  return (
    <section className="flex flex-col gap-1">
      <div className="flex items-center gap-8">
        <p className="flex items-center gap-2 w-[150px] text-muted-foreground">
          <UserIcon className="size-4" /> Owner
        </p>
        <Button variant="ghost" className="font-normal">
          {owner.name}
        </Button>
      </div>
      <div className="flex items-center gap-8">
        <p className="flex items-center gap-2 w-[150px] text-muted-foreground">
          <Calendar className="size-4" /> Start date
        </p>
        <Button variant="ghost" className="font-normal">
          <DateDisplay
            date={project.startDate}
            outputFormat="MMM d, yyyy h:mm a"
          />
        </Button>
      </div>
      <div className="flex items-center gap-8">
        <p className="flex items-center gap-2 w-[150px] text-muted-foreground">
          <Calendar className="size-4" /> End date
        </p>
        <Button variant="ghost" className="font-normal">
          <DateDisplay
            date={project.endDate}
            outputFormat="MMM d, yyyy h:mm a"
          />
        </Button>
      </div>
      <div className="flex items-center gap-8">
        <p className="flex items-center gap-2 w-[150px] text-muted-foreground">
          <TrendingUp className="size-4" /> Status
        </p>
        <Button variant="ghost" className="font-normal">
          {
            projectStatuses.find((status) => status.value === project.status)!
              .name
          }
        </Button>
      </div>
      <div className="flex items-center gap-8">
        <p className="flex items-center gap-2 w-[150px] text-muted-foreground">
          <Flame className="size-4" /> Priority
        </p>
        <Button variant="ghost" className="font-normal">
          {
            projectPriorities.find(
              (priority) => priority.value === project.priority
            )!.name
          }
        </Button>
      </div>
    </section>
  );
};

export default ProjectDetails;
