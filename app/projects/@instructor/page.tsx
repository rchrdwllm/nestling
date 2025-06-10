import ProjectsProgressGraph from "@/components/shared/projects-page/projects-progress-graph";
import ProjectsStatusGraph from "@/components/shared/projects-page/projects-status-graph";
import ProjectsTable from "@/components/shared/projects-page/projects-table";
import { projectCols } from "@/components/shared/projects-page/projects-table-def";
import ProjectsTimeline from "@/components/shared/projects-page/projects-timeline";
import TasksPriorityGraph from "@/components/shared/projects-page/tasks-priority-graph";
import {
  getProjectsOfUser,
  getProjectsWithTasks,
  getUnarchivedProjects,
  getUserProjectsWithTasks,
} from "@/lib/project";
import { getIncompleteTasks } from "@/lib/task";
import { getAllAdmins, getAllInstructors, getOptimisticUser } from "@/lib/user";
import ErrorToast from "@/components/ui/error-toast";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";

const InstructorProjectsDashboard = async () => {
  const user = await getOptimisticUser();
  const { success: projects, error: projectsError } = await getProjectsOfUser(
    user.id
  );
  const { success: tasks, error: tasksError } = await getIncompleteTasks();
  const { success: projectsWithTasks, error: projectsWithTasksError } =
    await getUserProjectsWithTasks(user.id);
  const { success: admins, error: adminsError } = await getAllAdmins();
  const { success: instructors, error: instructorsError } =
    await getAllInstructors();

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
      <main className="flex flex-col p-6 gap-8">
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
    </FadeInWrapper>
  );
};

export default InstructorProjectsDashboard;
