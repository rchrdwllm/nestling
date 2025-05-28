"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  usePathname,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode } from "react";

type CourseSectionLinkProps = {
  href: string;
  children: ReactNode;
  segments?: string[];
};

const CourseSectionLink = ({
  href,
  children,
  segments,
}: CourseSectionLinkProps) => {
  const layoutSegments = useSelectedLayoutSegments();
  const layoutSegment = useSelectedLayoutSegment();
  const pathname = usePathname();

  return (
    <Link href={href}>
      <Button
        variant="link"
        className={cn(
          "h-unset p-0",
          layoutSegments.every((segment) => segments?.includes(segment)) &&
            segments?.every((segment) => layoutSegments.includes(segment))
            ? "text-primary underline"
            : "text-muted-foreground",
          !layoutSegment && !segments && "text-primary underline",
          pathname === href && "text-primary underline"
        )}
      >
        {children}
      </Button>
    </Link>
  );
};

export default CourseSectionLink;
