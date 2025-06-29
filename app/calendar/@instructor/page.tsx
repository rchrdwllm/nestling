import FullCalendar from "@/components/ui/full-calendar";
import { getProjectsOfUser } from "@/lib/project";
import { getIncompleteUserTasks } from "@/lib/task";
import { getOptimisticUser } from "@/lib/user";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import ErrorToast from "@/components/ui/error-toast";
import Searcher from "@/components/shared/search/general-search/searcher";
import Unauthorized from "@/components/ui/unauthorized";

const InstructorCalendarPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};
  const user = await getOptimisticUser();

  if (user.role !== "instructor") return <Unauthorized />;

  const { success: instructorProjects, error: instructorProjectsError } =
    await getProjectsOfUser(user.id);
  const { success: instructorTasks, error: instructorTasksError } =
    await getIncompleteUserTasks(user.id);

  if (instructorProjectsError || instructorTasksError) {
    return (
      <ErrorToast
        error={
          "Failed to fetch instructor projects and tasks: " +
          (instructorProjectsError || instructorTasksError)
        }
      />
    );
  }

  if (!instructorProjects || !instructorTasks) {
    return (
      <ErrorToast error="No projects or tasks found for the instructor." />
    );
  }

  const projectsAndTasks = [
    ...instructorProjects.map((project) => ({
      start: new Date(project.startDate),
      end: new Date(project.endDate),
      title: project.title,
      id: project.id,
      url: `/projects/${project.id}`,
      type: "project" as "project",
      description: project.description,
    })),
    ...instructorTasks.map((task) => ({
      start: new Date(task.startDate),
      end: new Date(task.endDate),
      title: task.title,
      id: task.id,
      url: `/projects/${task.projectId}`,
      type: "task" as "task",
      description: task.description,
    })),
  ];
  return (
    <FadeInWrapper>
      <Searcher query={query} page={page} tab={tab} />
      <FullCalendar events={projectsAndTasks} />
    </FadeInWrapper>
  );
};

export default InstructorCalendarPage;
