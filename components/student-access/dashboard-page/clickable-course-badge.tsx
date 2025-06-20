"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface ClickableCourseBadgeProps {
  courseId: string;
  courseCode: string;
}

const ClickableCourseBadge = ({
  courseId,
  courseCode,
}: ClickableCourseBadgeProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/courses/${courseId}`);
  };

  return (
    <Badge
      variant="secondary"
      className="hover:bg-secondary/80 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      {courseCode}
    </Badge>
  );
};

export default ClickableCourseBadge;
