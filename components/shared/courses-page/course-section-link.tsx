import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode } from "react";

type CourseSectionLinkProps = {
  href: string;
  children: ReactNode;
  segment?: string;
};

const CourseSectionLink = ({
  href,
  children,
  segment,
}: CourseSectionLinkProps) => {
  const segments = useSelectedLayoutSegments();
  const layoutSegment = useSelectedLayoutSegment();

  return (
    <Link href={href}>
      <Button
        variant="link"
        className={cn(
          "h-unset p-0",
          segments.includes(segment || "")
            ? "text-primary underline"
            : "text-muted-foreground",
          !layoutSegment && !segment && "text-primary underline"
        )}
      >
        {children}
      </Button>
    </Link>
  );
};

export default CourseSectionLink;
