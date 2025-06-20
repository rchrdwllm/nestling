import UpcomingTaskCard from "@/components/shared/projects-page/upcoming-task-card";
import Searcher from "@/components/shared/search/general-search/searcher";
import ErrorToast from "@/components/ui/error-toast";
import { getUserTasks } from "@/lib/task";
import { getOptimisticUser } from "@/lib/user";

const TasksPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};
  const user = await getOptimisticUser();
  const { success: tasks, error: tasksError } = await getUserTasks(user.id);

  if (tasksError || !tasks) {
    return <ErrorToast error={"Error fetching tasks: " + tasksError} />;
  }

  return (
    <main className="flex flex-col gap-8 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-3xl">Tasks</h1>
        <hr />
      </div>
      <section>
        {tasks.length > 0 ? (
          tasks.map((task) => <UpcomingTaskCard key={task.id} {...task} />)
        ) : (
          <p className="text-muted-foreground text-sm">No tasks</p>
        )}
      </section>
    </main>
  );
};

export default TasksPage;
