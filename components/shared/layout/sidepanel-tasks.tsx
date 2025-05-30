"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { X } from "lucide-react";
import StudentTaskCard from "./student-task-card";
import EmployeeTaskCard from "./employee-task-card";
import { Content, Task } from "@/types";

type SidePanelTasksProps = {
  tasks: any[];
};

const SidePanelTasks = ({ tasks }: SidePanelTasksProps) => {
  const { user } = useCurrentUser();

  return (
    <div>
      <section className="flex justify-between items-center">
        <h1 className="font-semibold">Pending tasks</h1>
        <Button variant="outline" className="px-2">
          <X className="size-5" />
        </Button>
      </section>
      <div className="flex flex-col gap-4 mt-4">
        {user.role === "student"
          ? tasks.map((task) => <StudentTaskCard key={task.id} {...task} />)
          : tasks.map((task) => <EmployeeTaskCard key={task.id} {...task} />)}
      </div>
    </div>
  );
};

export default SidePanelTasks;
