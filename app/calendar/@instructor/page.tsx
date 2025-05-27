import FullCalendar from "@/components/ui/full-calendar";
import { getInstructorProjects } from "@/lib/project";
import { getOptimisticUser } from "@/lib/user";

const InstructorCalendarPage = async () => {
  const user = await getOptimisticUser();
  const { success: instructorProjects, error: instructorProjectsError } =
    await getInstructorProjects(user.id);

  if (instructorProjectsError) {
    console.error(
      "Error fetching instructor projects:",
      instructorProjectsError
    );
    return <div>Error loading instructor projects</div>;
  }

  if (!instructorProjects) {
    return <div>No instructor projects found</div>;
  }

  return (
    <FullCalendar
      events={instructorProjects.map((project) => ({
        ...project,
        start: new Date(project.startDate),
        end: new Date(project.endDate),
        url: `/projects/${project.id}`,
        type: "project",
      }))}
    />
  );
};

export default InstructorCalendarPage;
