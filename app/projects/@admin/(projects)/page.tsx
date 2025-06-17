import ProjectsProgressGraph from "@/components/shared/projects-page/projects-progress-graph";
import ProjectsStatusGraph from "@/components/shared/projects-page/projects-status-graph";
import ProjectsTable from "@/components/shared/projects-page/projects-table";
import { projectCols } from "@/components/shared/projects-page/projects-table-def";
import ProjectsTimeline from "@/components/shared/projects-page/projects-timeline";
import TasksPriorityGraph from "@/components/shared/projects-page/tasks-priority-graph";
import ErrorToast from "@/components/ui/error-toast";
import { getProjectsWithTasks, getUnarchivedProjects } from "@/lib/project";
import { getIncompleteTasks } from "@/lib/task";
import { getUnarchivedAdmins, getUnarchivedInstructors } from "@/lib/user";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import Searcher from "@/components/shared/search/general-search/searcher";

const AdminProjectsPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};
  const { success: projects, error: projectsError } =
    await getUnarchivedProjects();
  const { success: tasks, error: tasksError } = await getIncompleteTasks();
  const { success: projectsWithTasks, error: projectsWithTasksError } =
    await getProjectsWithTasks();
  const { success: admins, error: adminsError } = await getUnarchivedAdmins();
  const { success: instructors, error: instructorsError } =
    await getUnarchivedInstructors();

  if (adminsError || instructorsError || projectsError) {
    return (
      <ErrorToast
        error={
          "Error fetching data: " +
          (adminsError || instructorsError || projectsError)
        }
      />
    );
  }

  if (!admins || !instructors || !projects) {
    return <ErrorToast error={"No data available."} />;
  }

  if (projectsError || !projects) {
    return <ErrorToast error={"Error fetching projects: " + projectsError} />;
  }

  if (tasksError || !tasks) {
    return <ErrorToast error={"Error fetching tasks: " + tasksError} />;
  }

  if (projectsWithTasksError || !projectsWithTasks) {
    return (
      <ErrorToast
        error={"Error fetching projects with tasks: " + projectsWithTasksError}
      />
    );
  }
  return (
    <FadeInWrapper>
      <Searcher query={query} page={page} tab={tab} />
      <main className="flex flex-col gap-8 p-6 h-full">
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-3xl">Projects Dashboard</h1>
          <hr />
        </div>
        <section className="gap-4 grid grid-cols-2 pb-6">
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
          <article className="col-span-2 min-h-[378px]">
            <ProjectsProgressGraph projects={projectsWithTasks} />
          </article>
        </section>
      </main>
    </FadeInWrapper>
  );
};

export default AdminProjectsPage;
