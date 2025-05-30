import FullCalendar from "@/components/ui/full-calendar";
import { getProjectsOfUser } from "@/lib/project";
import { getIncompleteUserTasks } from "@/lib/task";
import { getOptimisticUser } from "@/lib/user";

const AdminCalendarPage = async () => {
  const user = await getOptimisticUser();
  const { success: adminProjects, error: adminProjectsError } =
    await getProjectsOfUser(user.id);
  const { success: adminTasks, error: adminTasksError } =
    await getIncompleteUserTasks(user.id);

  if (adminProjectsError || adminTasksError) {
    console.error(
      "Error fetching admin projects and tasks:",
      adminProjectsError || adminTasksError
    );
    return <div>Error loading admin projects and tasks</div>;
  }

  if (!adminProjects || !adminTasks) {
    return <div>No admin projects or tasks found</div>;
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

  return <FullCalendar events={projectsAndTasks} />;
};

export default AdminCalendarPage;
