"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface ClickableProjectBadgeProps {
  projectId: string;
  projectTitle: string;
}

const ClickableProjectBadge = ({
  projectId,
  projectTitle,
}: ClickableProjectBadgeProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/projects/${projectId}`);
  };

  return (
    <Badge
      variant="secondary"
      className="hover:bg-secondary/80 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      {projectTitle}
    </Badge>
  );
};

export default ClickableProjectBadge;
