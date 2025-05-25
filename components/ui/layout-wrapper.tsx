"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./sidebar/sidebar";
import { ScrollArea } from "./scroll-area";
import { useUser } from "@/hooks/use-user";
import { usePathname } from "next/navigation";
import SidePanel from "../student-access/dashboard-page/side-panel";

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
    <main className="relative min-h-screen flex items-stretch bg-secondary p-2 gap-2">
      <Sidebar />
      <ScrollArea className="projects-scroll-area w-full shadow-sm h-[calc(100vh-1rem)] bg-background border border-border rounded-xl">
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
