"use client";

import { useProjectsSidebarStore } from "@/context/projects-sidebar-context";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const ProjectsAreaExpander = ({ children }: { children: ReactNode }) => {
  const { isToggled } = useProjectsSidebarStore();

  return (
    <div className={cn(isToggled ? "col-span-6" : "col-span-8")}>
      {children}
    </div>
  );
};

export default ProjectsAreaExpander;
