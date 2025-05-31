import ProjectsTable from "@/components/shared/projects-page/projects-table";
import { getArchivedProjects } from "@/lib/project";

const ProjectsArchivePage = async () => {
  const { success: archivedProjects, error } = await getArchivedProjects();

  if (error) {
    console.error("Error fetching archived projects:", error);

    return <h1>Error fetching archived projects</h1>;
  }

  if (!archivedProjects) {
    console.error("Error fetching archived projects:", error);

    return <h1>Error fetching archived projects</h1>;
  }

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Archived Projects</h1>
        <hr />
      </div>
      <ProjectsTable projects={archivedProjects} />
    </div>
  );
};

export default ProjectsArchivePage;
