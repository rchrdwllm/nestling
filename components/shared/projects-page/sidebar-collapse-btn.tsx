"use client";

import { Button } from "@/components/ui/button";
import { useProjectsSidebarStore } from "@/context/projects-sidebar-context";
import { PanelLeft } from "lucide-react";

const SidebarCollapseBtn = () => {
  const { isToggled, setIsToggled } = useProjectsSidebarStore();

  return (
    <Button
      size="sm"
      className="text-muted-foreground"
      variant="ghost"
      onClick={() => setIsToggled(!isToggled)}
    >
      <PanelLeft />
    </Button>
  );
};

export default SidebarCollapseBtn;
