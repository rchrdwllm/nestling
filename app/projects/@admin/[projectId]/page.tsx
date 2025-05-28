import EditProjectBtn from "@/components/admin-access/projects-page/edit-project-btn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjectById } from "@/lib/project";
import { getAllAdmins, getAllInstructors } from "@/lib/user";
import { Plus } from "lucide-react";
import { projectStatuses } from "@/constants/project-statuses";

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;
  const { success: project, error: projectError } = await getProjectById(
    projectId
  );
  const { success: admins, error: adminsError } = await getAllAdmins();
  const { success: instructors, error: instructorsError } =
    await getAllInstructors();

  if (adminsError || instructorsError || projectError) {
    console.error(
      "Error fetching data:",
      adminsError || instructorsError || projectError
    );
    return <div>Error loading data. Please try again later.</div>;
  }

  if (!admins || !instructors || !project) {
    return <div>No data available.</div>;
  }

  return (
    <main className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-3xl font-semibold flex items-center gap-4 flex-1">
            <span>{project.title}</span>{" "}
            <Badge
              style={{
                backgroundColor: projectStatuses.find(
                  (status) => status.value === project.status
                )!.color,
              }}
            >
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </h1>
          <EditProjectBtn
            admins={JSON.stringify(admins)}
            instructors={JSON.stringify(instructors)}
            project={JSON.stringify(project)}
          />
          <Button>
            <Plus className="size-4" /> Add task
          </Button>
        </div>
        <hr />
      </div>
    </main>
  );
};

export default ProjectPage;
