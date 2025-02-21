"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarItem } from "@/constants/sidebar-items";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const SidebarLink = ({ Icon, href, label }: SidebarItem) => {
  const pathname = usePathname();
  const isActive = useMemo(() => pathname === href, [pathname, href]);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={250}>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "flex items-center justify-center rounded-lg border border-background p-2 transition-all group hover:border-border",
              isActive ? "shadow-md border-border" : null
            )}
          >
            <Icon
              className={cn(
                "size-6 transition-colors text-muted-foreground/65 group-hover:text-foreground",
                isActive ? "text-foreground" : null
              )}
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarLink;
