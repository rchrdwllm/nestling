import { Button } from "@/components/ui/button";
import UpcomingTaskCard from "./upcoming-task-card";
import ErrorToast from "@/components/ui/error-toast";
import { getIncompleteUserTasks } from "@/lib/task";
import { getOptimisticUser } from "@/lib/user";
import Link from "next/link";

const UpcomingTasks = async () => {
  const user = await getOptimisticUser();
  const { success: tasks, error: tasksError } = await getIncompleteUserTasks(
    user.id
  );

  if (tasksError || !tasks) {
    return (
      <ErrorToast error={"Error fetching upcoming tasks: " + tasksError} />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Upcoming tasks</h1>
        <Link href="/projects/tasks">
          <Button
            variant="link"
            className="px-0 text-muted-foreground hover:text-primary"
          >
            View all
          </Button>
        </Link>
      </div>
      <section className="flex flex-col gap-4">
        {tasks.map((task) => (
          <UpcomingTaskCard key={task.id} {...task} />
        ))}
      </section>
    </div>
  );
};

export default UpcomingTasks;
