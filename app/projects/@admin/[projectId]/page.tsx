import { getProjectById } from "@/lib/project";

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;
  const { success: project, error: projectError } = await getProjectById(
    projectId
  );

  if (projectError) {
    console.error("Error fetching project:", projectError);
    return <p>Error fetching project: {projectError}</p>;
  }

  if (!project) {
    return <p>Project not found</p>;
  }

  return (
    <main className="p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">{project.title}</h1>
        <hr />
      </div>
    </main>
  );
};

export default ProjectPage;
