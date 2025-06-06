import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarItem } from "@/constants/sidebar-items";
import { useNotifCountStore } from "@/context/notif-count-context";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const NotifLink = ({ Icon, href, label }: SidebarItem) => {
  const { notifCount } = useNotifCountStore();
  const pathname = usePathname();
  const isActive = useMemo(() => {
    return pathname === href || pathname.startsWith(href);
  }, [pathname, href]);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={250}>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "relative flex items-center justify-center rounded-lg border border-background p-2 transition-all group hover:border-border",
              isActive ? "bg-primary" : null
            )}
          >
            <Icon
              className={cn(
                "size-6 transition-colors text-muted-foreground/65 group-hover:text-foreground",
                isActive
                  ? "text-primary-foreground group-hover:text-primary-foreground"
                  : null
              )}
            />
            {notifCount > 0 && (
              <span
                className={cn(
                  "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground",
                  pathname.includes("/notifications") &&
                    "bg-card border border-border text-foreground"
                )}
              >
                {notifCount}
              </span>
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NotifLink;
