"use client";

import { Project } from "@/types";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectStatuses, projectPriorities } from "@/constants/project";
import { Badge } from "@/components/ui/badge";
import { useSearchStore } from "@/context/search-context";

const ProjectCard = ({ id, title, status, priority }: Project) => {
  const { setSearchItemClicked } = useSearchStore();

  return (
    <Link
      href={`/projects/${id}`}
      onClick={() => {
        setSearchItemClicked(true);
      }}
      className="w-full"
    >
      <Button
        variant="link"
        className="inline-flex justify-between items-center p-0 w-full text-left"
      >
        <div className="flex items-center gap-3">
          <span>
            <Briefcase className="size-4" />
          </span>
          <h1>{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            style={{
              backgroundColor: projectStatuses.find(
                (projectStatus) => projectStatus.value === status
              )!.color,
            }}
          >
            {projectStatuses
              .find((projectStatus) => projectStatus.value === status)!
              .name.charAt(0)
              .toUpperCase() +
              projectStatuses
                .find((projectStatus) => projectStatus.value === status)!
                .name.slice(1)}
          </Badge>
          <Badge
            style={{
              backgroundColor: projectPriorities.find(
                (projectPriority) => projectPriority.value === priority
              )!.color,
            }}
          >
            {projectPriorities
              .find((projectPriority) => projectPriority.value === priority)!
              .name.charAt(0)
              .toUpperCase() +
              projectPriorities
                .find((projectPriority) => projectPriority.value === priority)!
                .name.slice(1)}
          </Badge>
        </div>
      </Button>
    </Link>
  );
};

export default ProjectCard;
