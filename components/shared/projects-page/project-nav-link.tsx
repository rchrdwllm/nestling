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
import { Button } from "@/components/ui/button";

type ProjectNavLinkProps = {
  href: string;
  children: ReactNode;
};

const ProjectNavLink = ({ href, children }: ProjectNavLinkProps) => {
  const pathname = usePathname();
  const isActive = useMemo(() => pathname === href, [pathname]);

  return (
    <Link className="block" href={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full text-left justify-start rounded-none flex items-center gap-2 py-2 px-4 text-muted-foreground/65 group-hover:text-foreground",
          isActive &&
            "bg-secondary text-foreground font-medium hover:bg-secondary hover:text-foreground"
        )}
      >
        <Briefcase className="size-4" /> <span>{children}</span>
      </Button>
    </Link>
  );
};

export default ProjectNavLink;
