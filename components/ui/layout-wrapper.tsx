"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./sidebar/sidebar";
import { ScrollArea } from "./scroll-area";
import { useUser } from "@/hooks/use-user";
import { usePathname } from "next/navigation";
import SidePanel from "../shared/layout/side-panel";
import { cn } from "@/lib/utils";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { user } = useUser();
  const [rightPanelToggled, setRightPanelToggled] = useState(true);

  if (
    !user ||
    pathname === "/api/auth/signin" ||
    pathname === "/api/auth/signup"
  )
    return children;

  return (
    <main className="relative flex items-stretch gap-2 bg-secondary p-2 h-screen overflow-x-hidden">
      <Sidebar />
      <ScrollArea
        className={cn(
          "projects-scroll-area w-full shadow-sm h-[calc(100vh-1rem)] bg-background border border-border rounded-xl",
          (pathname.startsWith("/projects") ||
            pathname.startsWith("/inbox") ||
            pathname.startsWith("/courses")) &&
            "border-0 shadow-none"
        )}
      >
        {children}
      </ScrollArea>
      <SidePanel
        rightPanelToggled={rightPanelToggled}
        setRightPanelToggled={setRightPanelToggled}
      />
    </main>
  );
};

export default LayoutWrapper;
