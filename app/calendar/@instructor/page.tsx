import FullCalendar from "@/components/ui/full-calendar";
import { getProjectsOfUser } from "@/lib/project";
import { getIncompleteUserTasks } from "@/lib/task";
import { getOptimisticUser } from "@/lib/user";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";

const InstructorCalendarPage = async () => {
  const user = await getOptimisticUser();
  const { success: instructorProjects, error: instructorProjectsError } =
    await getProjectsOfUser(user.id);
  const { success: instructorTasks, error: instructorTasksError } =
    await getIncompleteUserTasks(user.id);

  if (instructorProjectsError || instructorTasksError) {
    console.error(
      "Error fetching instructor projects and tasks:",
      instructorProjectsError || instructorTasksError
    );
    return <div>Error loading instructor projects and tasks</div>;
  }

  if (!instructorProjects || !instructorTasks) {
    return <div>No instructor projects or tasks found</div>;
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
      <FullCalendar events={projectsAndTasks} />
    </FadeInWrapper>
  );
};

export default InstructorCalendarPage;
