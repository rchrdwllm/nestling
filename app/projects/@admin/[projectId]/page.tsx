import EditProjectBtn from "@/components/admin-access/projects-page/edit-project-btn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getProjectAssociates,
  getProjectById,
  getProjectHeads,
} from "@/lib/project";
import { getAllAdmins, getAllInstructors } from "@/lib/user";
import { Plus } from "lucide-react";
import { projectPriorities, projectStatuses } from "@/constants/project";
import ArchiveProjectBtn from "@/components/admin-access/projects-page/archive-project-btn";
import CreateTaskBtn from "@/components/shared/projects-page/create-task-btn";
import { getProjectTasks } from "@/lib/task";
import TasksTable from "@/components/shared/projects-page/tasks-table";

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

  const { success: heads, error: headsError } = await getProjectHeads(
    project.id
  );
  const { success: associates, error: associatesError } =
    await getProjectAssociates(project.id);

  if (headsError || associatesError) {
    console.error("Error fetching data:", headsError || associatesError);
    return <div>Error loading data. Please try again later.</div>;
  }

  if (!heads || !associates) {
    return <div>No data available.</div>;
  }

  const availableAssignees = [...heads, ...associates];

  const { success: tasks, error: tasksError } = await getProjectTasks(
    project.id
  );

  if (tasksError) {
    console.error("Error fetching data:", headsError || associatesError);
    return <div>Error loading data. Please try again later.</div>;
  }

  if (!tasks) {
    return <div>No data available.</div>;
  }

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-stretch justify-between gap-2">
          <h1 className="text-3xl font-semibold flex items-center gap-4 flex-1">
            <span>{project.title}</span>{" "}
            <div className="flex gap-2 items-center">
              <Badge
                style={{
                  backgroundColor: projectStatuses.find(
                    (status) => status.value === project.status
                  )!.color,
                }}
              >
                {project.status.charAt(0).toUpperCase() +
                  project.status.slice(1)}
              </Badge>
              <Badge
                style={{
                  backgroundColor: projectPriorities.find(
                    (priority) => priority.value === project.priority
                  )!.color,
                }}
              >
                {project.priority.charAt(0).toUpperCase() +
                  project.priority.slice(1)}
              </Badge>
            </div>
          </h1>
          <ArchiveProjectBtn
            projectId={project.id}
            isArchived={project.isArchived}
          />
          <EditProjectBtn
            admins={JSON.stringify(admins)}
            instructors={JSON.stringify(instructors)}
            project={JSON.stringify(project)}
          />
          <CreateTaskBtn
            availableAssignees={JSON.stringify(availableAssignees)}
            projectId={project.id}
          />
        </div>
        <hr />
      </div>
      <h3 className="text-xl font-semibold">Tasks</h3>
      <TasksTable tasks={tasks} />
    </div>
  );
};

export default ProjectPage;
