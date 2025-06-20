import UpcomingTaskCard from "@/components/admin-access/dashboard-page/upcoming-task-card";
import { CardContent } from "@/components/ui/card";
import ErrorToast from "@/components/ui/error-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getIncompleteUserTasks } from "@/lib/task";
import { getOptimisticUser } from "@/lib/user";

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
    <ScrollArea className="shadow-sm border border-border rounded-lg h-full max-h-[550px]">
      <div className="flex flex-col gap-4 p-4 h-full">
        <div>
          <h1 className="font-semibold text-xl">Upcoming tasks</h1>
          <p className="text-muted-foreground text-sm">
            Your upcoming tasks in projects you are a member of
          </p>
        </div>
        <CardContent className="flex flex-col gap-2 p-0">
          {tasks.map((task) => (
            <UpcomingTaskCard key={task.id} {...task} />
          ))}
        </CardContent>
      </div>
    </ScrollArea>
  );
};

export default UpcomingTasks;
