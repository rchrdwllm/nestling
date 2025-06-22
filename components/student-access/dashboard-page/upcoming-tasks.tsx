import UpcomingTaskCard from "./upcoming-task-card";
import ErrorToast from "@/components/ui/error-toast";
import { getUpcomingAssignmentsForStudent } from "@/lib/content";
import { getOptimisticUser } from "@/lib/user";

const UpcomingTasks = async () => {
  const user = await getOptimisticUser();
  const { success: tasks, error: tasksError } =
    await getUpcomingAssignmentsForStudent(user.id);

  if (tasksError || !tasks) {
    return (
      <ErrorToast error={"Error fetching upcoming tasks: " + tasksError} />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Upcoming tasks</h1>
      </div>
      <section className="flex flex-col gap-4">
        {!tasks.length ? (
          <p className="text-muted-foreground">No upcoming tasks</p>
        ) : (
          tasks.map((task) => <UpcomingTaskCard key={task.id} {...task} />)
        )}
      </section>
    </div>
  );
};

export default UpcomingTasks;
