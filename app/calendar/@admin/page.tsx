import ErrorToast from "@/components/ui/error-toast";
import FullCalendar from "@/components/ui/full-calendar";
import { getProjectsOfUser } from "@/lib/project";
import { getIncompleteUserTasks } from "@/lib/task";
import { getOptimisticUser } from "@/lib/user";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";

const AdminCalendarPage = async () => {
  const user = await getOptimisticUser();
  const { success: adminProjects, error: adminProjectsError } =
    await getProjectsOfUser(user.id);
  const { success: adminTasks, error: adminTasksError } =
    await getIncompleteUserTasks(user.id);

  if (adminProjectsError || adminTasksError) {
    return (
      <ErrorToast
        error={
          "Error fetching admin projects and tasks: " +
          (adminProjectsError || adminTasksError)
        }
      />
    );
  }

  if (!adminProjects || !adminTasks) {
    return <ErrorToast error="No admin projects or tasks found." />;
  }

  const projectsAndTasks = [
    ...adminProjects.map((project) => ({
      start: new Date(project.startDate),
      end: new Date(project.endDate),
      title: project.title,
      id: project.id,
      url: `/projects/${project.id}`,
      type: "project" as "project",
      description: project.description,
    })),
    ...adminTasks.map((task) => ({
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

export default AdminCalendarPage;
