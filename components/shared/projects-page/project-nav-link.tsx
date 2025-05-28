"use client";

import Link from "next/link";
import { ReactNode, useMemo } from "react";
import { Briefcase } from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { cn } from "@/lib/utils";

type ProjectNavLinkProps = {
  href: string;
  children: ReactNode;
};

const ProjectNavLink = ({ href, children }: ProjectNavLinkProps) => {
  const pathname = usePathname();
  const isActive = useMemo(() => pathname === href, [pathname]);

  return (
    <Link
      className={cn(
        "flex items-center gap-2 py-2 px-4 transition-colors text-muted-foreground/65 hover:bg-secondary hover:text-foreground",
        isActive &&
          "bg-secondary text-foreground font-medium hover:bg-secondary hover:text-foreground"
      )}
      href={href}
    >
      <Briefcase className="size-4" /> <span>{children}</span>
    </Link>
  );
};

export default ProjectNavLink;
