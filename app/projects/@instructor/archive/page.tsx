import ProjectsTable from "@/components/shared/projects-page/projects-table";
import { projectCols } from "@/components/shared/projects-page/projects-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getArchivedUserProjects } from "@/lib/project";
import { getOptimisticUser } from "@/lib/user";

const ProjectsArchivePage = async () => {
  const user = await getOptimisticUser();
  const { success: archivedProjects, error } = await getArchivedUserProjects(
    user.id
  );

  if (error || !archivedProjects) {
    return (
      <ErrorToast
        error={"Error fetching archived projects: " + (error || "")}
      />
    );
  }

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Archived Projects</h1>
        <hr />
      </div>
      <ProjectsTable columns={projectCols} data={archivedProjects} />
    </div>
  );
};

export default ProjectsArchivePage;
