import FullCalendar from "@/components/ui/full-calendar";
import { getProjects } from "@/lib/project";

const AdminCalendarPage = async () => {
  const { success: projects, error: projectsError } = await getProjects();

  if (projectsError) {
    console.error("Error fetching projects:", projectsError);
    return <div>Error loading projects</div>;
  }

  if (!projects) {
    console.error("No projects found");
    return <div>No projects available</div>;
  }

  return (
    <FullCalendar
      events={projects.map((project) => ({
        start: new Date(project.startDate),
        end: new Date(project.endDate),
        title: project.title,
        id: project.id,
        url: `/projects/${project.id}`,
        type: "project",
        description: project.description,
      }))}
    />
  );
};

export default AdminCalendarPage;
