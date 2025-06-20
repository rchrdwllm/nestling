"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import StudentTaskCard from "./student-task-card";
import UpcomingTaskCard from "../../admin-access/dashboard-page/upcoming-task-card";

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
      <div className="flex flex-col gap-2 mt-4">
        {tasks.length ? (
          user.role === "student" ? (
            tasks.map((task) => <StudentTaskCard key={task.id} {...task} />)
          ) : (
            tasks.map((task) => <UpcomingTaskCard key={task.id} {...task} />)
          )
        ) : (
          <p className="text-muted-foreground text-sm">No pending tasks</p>
        )}
      </div>
    </div>
  );
};

export default SidePanelTasks;
