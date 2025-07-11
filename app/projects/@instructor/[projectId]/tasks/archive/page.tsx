import TasksTable from "@/components/shared/projects-page/tasks-table";
import ErrorToast from "@/components/ui/error-toast";
import { getProjectAssociates, getProjectHeads } from "@/lib/project";
import { getArchivedProjectTasks } from "@/lib/task";

const ArchivedTasks = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  const { success: archivedTasks, error } = await getArchivedProjectTasks(
    projectId
  );

  if (error) {
    console.error("Error fetching archived tasks:", error);
    return <div>Error loading archived tasks. Please try again later.</div>;
  }

  if (!archivedTasks) {
    console.error("Error fetching archived tasks: No tasks found");
    return <div>No archived tasks available.</div>;
  }

  const { success: heads, error: headsError } = await getProjectHeads(
    projectId
  );
  const { success: associates, error: associatesError } =
    await getProjectAssociates(projectId);

  if (headsError || associatesError || !heads || !associates) {
    return (
      <ErrorToast
        error={
          "Error loading project members: " + (headsError || associatesError)
        }
      />
    );
  }

  const availableAssignees = [
    ...new Map(
      [...heads, ...associates].map((user) => [user.id, user])
    ).values(),
  ];

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-3xl">Archived Tasks</h1>
        <hr />
      </div>
      <div>
        <TasksTable
          tasks={archivedTasks}
          availableAssignees={availableAssignees}
        />
      </div>
    </div>
  );
};

export default ArchivedTasks;
