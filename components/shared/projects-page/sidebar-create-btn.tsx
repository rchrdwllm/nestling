"use client";

import { Button } from "@/components/ui/button";
import { useProjectsTimelineStore } from "@/context/projects-timeline-context";
import { Plus } from "lucide-react";

const SidebarCreateBtn = () => {
  const { setFormToggled, setSelectedEndDate, setSelectedStartDate } =
    useProjectsTimelineStore();

  return (
    <Button
      onClick={() => {
        setFormToggled(true);
        setSelectedStartDate(new Date());
        setSelectedEndDate(new Date());
      }}
      className="px-2 aspect-square text-muted-foreground hover:text-foreground"
      variant="ghost"
    >
      <Plus className="size-4" />
    </Button>
  );
};

export default SidebarCreateBtn;
