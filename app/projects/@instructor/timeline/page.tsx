import ProjectsTable from "@/components/shared/projects-page/projects-table";
import ProjectsTimeline from "@/components/shared/projects-page/projects-timeline";
import { getProjectsOfUser } from "@/lib/project";
import { getAllAdmins, getAllInstructors, getOptimisticUser } from "@/lib/user";

const TimelinePage = async () => {
  const user = await getOptimisticUser();
  const { success: admins, error: adminsError } = await getAllAdmins();
  const { success: instructors, error: instructorsError } =
    await getAllInstructors();
  const { success: projects, error: projectsError } = await getProjectsOfUser(
    user.id
  );

  if (adminsError || instructorsError || projectsError) {
    console.error(
      "Error fetching data:",
      adminsError || instructorsError || projectsError
    );
    return <div>Error loading data. Please try again later.</div>;
  }

  if (!admins || !instructors || !projects) {
    return <div>No data available.</div>;
  }

  return (
    <main className="min-h-full p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Projects Timeline</h1>
        <hr />
      </div>
      <div className="flex flex-col gap-20">
        <ProjectsTimeline
          admins={JSON.stringify(admins)}
          instructors={JSON.stringify(instructors)}
          projects={projects}
        />
        <ProjectsTable projects={projects} />
      </div>
    </main>
  );
};

export default TimelinePage;
