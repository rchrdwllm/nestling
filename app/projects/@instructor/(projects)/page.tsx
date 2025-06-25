import ProjectsProgressGraph from "@/components/shared/projects-page/projects-progress-graph";
import ProjectsStatusGraph from "@/components/shared/projects-page/projects-status-graph";
import ProjectsTable from "@/components/shared/projects-page/projects-table";
import { projectCols } from "@/components/shared/projects-page/projects-table-def";
import ProjectsTimeline from "@/components/shared/projects-page/projects-timeline";
import TasksPriorityGraph from "@/components/shared/projects-page/tasks-priority-graph";
import { getProjectsOfUser, getUserProjectsWithTasks } from "@/lib/project";
import { getIncompleteTasks, getIncompleteUserTasks } from "@/lib/task";
import {
  getUnarchivedAdmins,
  getUnarchivedInstructors,
  getOptimisticUser,
} from "@/lib/user";
import ErrorToast from "@/components/ui/error-toast";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import Searcher from "@/components/shared/search/general-search/searcher";

const InstructorProjectsDashboard = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};
  const user = await getOptimisticUser();
  const { success: projects, error: projectsError } = await getProjectsOfUser(
    user.id
  );
  const { success: tasks, error: tasksError } = await getIncompleteUserTasks(
    user.id
  );
  const { success: projectsWithTasks, error: projectsWithTasksError } =
    await getUserProjectsWithTasks(user.id);
  const { success: admins, error: adminsError } = await getUnarchivedAdmins();
  const { success: instructors, error: instructorsError } =
    await getUnarchivedInstructors();

  if (adminsError || instructorsError || projectsError) {
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
    <FadeInWrapper className="h-full">
      <Searcher query={query} page={page} tab={tab} />
      <main className="flex flex-col gap-8 p-6">
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

export default InstructorProjectsDashboard;
