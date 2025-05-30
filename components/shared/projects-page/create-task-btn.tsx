"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTasksTimelineStore } from "@/context/tasks-timeline-context";

const CreateTaskBtn = () => {
  const { setFormToggled } = useTasksTimelineStore();

  return (
    <Button onClick={() => setFormToggled(true)}>
      <Plus className="size-4" /> Add task
    </Button>
  );
};

export default CreateTaskBtn;
