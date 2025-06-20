import UpcomingTaskCard from "@/components/shared/projects-page/upcoming-task-card";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import ErrorToast from "@/components/ui/error-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <ScrollArea className="shadow-sm border border-border rounded-lg h-full max-h-[550px]">
      <div className="flex flex-col gap-4 p-4 h-full">
        <div>
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
