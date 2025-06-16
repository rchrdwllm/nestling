import ProjectsTable from "@/components/shared/projects-page/projects-table";
import { projectCols } from "@/components/shared/projects-page/projects-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getArchivedProjects } from "@/lib/project";
import Searcher from "@/components/shared/search/general-search/searcher";

const ProjectsArchivePage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};
  const { success: archivedProjects, error } = await getArchivedProjects();

  if (error || !archivedProjects) {
    return (
      <ErrorToast
        error={"Error fetching archived projects: " + (error || "")}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-3xl">Archived Projects</h1>
        <hr />
      </div>
      <ProjectsTable columns={projectCols} data={archivedProjects} />
    </div>
  );
};

export default ProjectsArchivePage;
