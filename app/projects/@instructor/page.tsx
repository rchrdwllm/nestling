import ProjectsProgressGraph from "@/components/shared/projects-page/projects-progress-graph";
import ProjectsStatusGraph from "@/components/shared/projects-page/projects-status-graph";
import ProjectsTable from "@/components/shared/projects-page/projects-table";
import { projectCols } from "@/components/shared/projects-page/projects-table-def";
import ProjectsTimeline from "@/components/shared/projects-page/projects-timeline";
import TasksPriorityGraph from "@/components/shared/projects-page/tasks-priority-graph";
import { getProjectsWithTasks, getUnarchivedProjects } from "@/lib/project";
import { getIncompleteTasks } from "@/lib/task";
import { getAllAdmins, getAllInstructors } from "@/lib/user";
import ErrorToast from "@/components/ui/error-toast";

const InstructorProjectsDashboard = async () => {
  const { success: projects, error: projectsError } =
    await getUnarchivedProjects();
  const { success: tasks, error: tasksError } = await getIncompleteTasks();
  const { success: projectsWithTasks, error: projectsWithTasksError } =
    await getProjectsWithTasks();
  const { success: admins, error: adminsError } = await getAllAdmins();
  const { success: instructors, error: instructorsError } =
    await getAllInstructors();

  if (adminsError || instructorsError || projectsError) {
    console.error(
      "Error fetching data:",
      adminsError || instructorsError || projectsError
    );
    return (
      <ErrorToast
        error={
          "Error loading data: " +
          (adminsError || instructorsError || projectsError)
        }
      />
    );
  }

  if (!admins || !instructors || !projects) {
    return (
      <ErrorToast
        error={
          "Error loading data: " +
          (adminsError || instructorsError || projectsError)
        }
      />
    );
  }

  if (projectsError || !projects) {
    console.error("Error fetching projects:", projectsError);
    return <ErrorToast error={"Error fetching projects: " + projectsError} />;
  }

  if (tasksError || !tasks) {
    console.error("Error fetching tasks:", tasksError);
    return <ErrorToast error={"Error fetching tasks: " + tasksError} />;
  }

  if (projectsWithTasksError || !projectsWithTasks) {
    console.error(
      "Error fetching projects with tasks:",
      projectsWithTasksError
    );
    return (
      <ErrorToast
        error={"Error fetching projects with tasks: " + projectsWithTasksError}
      />
    );
  }

  return (
    <main className="h-full p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Projects Dashboard</h1>
        <hr />
      </div>
      <section className="grid grid-cols-2 gap-4 pb-6">
        <article className="col-span-2">
          <ProjectsTimeline
            admins={JSON.stringify(admins)}
            instructors={JSON.stringify(instructors)}
            projects={projects}
          />
        </article>
        <article className="col-span-2">
          <ProjectsTable columns={projectCols} data={projects} />
        </article>
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

export default InstructorProjectsDashboard;
