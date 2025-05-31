import ProjectsProgressGraph from "@/components/shared/projects-page/projects-progress-graph";
import ProjectsStatusGraph from "@/components/shared/projects-page/projects-status-graph";
import TasksPriorityGraph from "@/components/shared/projects-page/tasks-priority-graph";
import { getProjectsWithTasks, getUnarchivedProjects } from "@/lib/project";
import { getIncompleteTasks } from "@/lib/task";

const AdminProjectsPage = async () => {
  const { success: projects, error: projectsError } =
    await getUnarchivedProjects();
  const { success: tasks, error: tasksError } = await getIncompleteTasks();
  const { success: projectsWithTasks, error: projectsWithTasksError } =
    await getProjectsWithTasks();

  if (projectsError || !projects) {
    console.error("Error fetching projects:", projectsError);

    return <h1>Error fetching projects: {projectsError}</h1>;
  }

  if (tasksError || !tasks) {
    console.error("Error fetching tasks:", tasksError);

    return <h1>Error fetching tasks: {tasksError}</h1>;
  }

  if (projectsWithTasksError || !projectsWithTasks) {
    console.error(
      "Error fetching projects with tasks:",
      projectsWithTasksError
    );

    return (
      <h1>Error fetching projects with tasks: {projectsWithTasksError}</h1>
    );
  }

  return (
    <main className="h-full p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Projects Dashboard</h1>
        <hr />
      </div>
      <section className="grid grid-cols-2 gap-4 pb-6">
        <article className="min-h-[378px]">
          <ProjectsStatusGraph projects={projects} />
        </article>
        <article className="min-h-[378px]">
          <TasksPriorityGraph tasks={tasks} />
        </article>
        <article className="min-h-[378px] col-span-2">
          <ProjectsProgressGraph projects={projectsWithTasks} />
        </article>
      </section>
    </main>
  );
};

export default AdminProjectsPage;
