import ProjectTimeline from "@/components/admin-access/projects-page/project-timeline";
import { getProjects } from "@/lib/project";
import { getAllAdmins, getAllInstructors } from "@/lib/user";

const AdminProjectsPage = async () => {
  const { success: admins, error: adminsError } = await getAllAdmins();
  const { success: instructors, error: instructorsError } =
    await getAllInstructors();
  const { success: projects, error: projectsError } = await getProjects();

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
    <main className="p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <hr />
      </div>
      <ProjectTimeline
        admins={JSON.stringify(admins)}
        instructors={JSON.stringify(instructors)}
        projects={projects}
      />
    </main>
  );
};

export default AdminProjectsPage;
