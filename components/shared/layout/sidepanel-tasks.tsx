"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import StudentTaskCard from "./student-task-card";
import EmployeeTaskCard from "./employee-task-card";

type SidePanelTasksProps = {
  tasks: any[];
};

const SidePanelTasks = ({ tasks }: SidePanelTasksProps) => {
  const { user } = useCurrentUser();

  return (
    <div>
      <section className="flex justify-between items-center">
        <h1 className="font-semibold">Pending tasks</h1>
      </section>
      <div className="flex flex-col gap-4 mt-4">
        {tasks.length ? (
          user.role === "student" ? (
            tasks.map((task) => <StudentTaskCard key={task.id} {...task} />)
          ) : (
            tasks.map((task) => <EmployeeTaskCard key={task.id} {...task} />)
          )
        ) : (
          <p className="text-sm text-muted-foreground">No pending tasks</p>
        )}
      </div>
    </div>
  );
};

export default SidePanelTasks;
