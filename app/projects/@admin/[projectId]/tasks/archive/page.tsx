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

  if (error || !archivedTasks) {
    return (
      <ErrorToast error={"Error loading archived tasks: " + (error || "")} />
    );
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

  const availableAssignees = [...heads, ...associates];

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Archived Tasks</h1>
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
