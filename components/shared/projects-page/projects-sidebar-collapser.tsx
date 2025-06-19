"use client";

import { useProjectsSidebarStore } from "@/context/projects-sidebar-context";
import { ReactNode } from "react";

const ProjectsSidebarCollapser = ({ children }: { children: ReactNode }) => {
  const { isToggled } = useProjectsSidebarStore();

  return isToggled ? <>{children}</> : null;
};

export default ProjectsSidebarCollapser;
