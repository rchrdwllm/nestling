import EditProjectBtn from "@/components/shared/projects-page/edit-project-btn";
import {
  getProjectAssociates,
  getProjectById,
  getProjectHeads,
} from "@/lib/project";
import { getAllAdmins, getAllInstructors, getUserById } from "@/lib/user";
import ArchiveProjectBtn from "@/components/admin-access/projects-page/archive-project-btn";
import CreateTaskBtn from "@/components/shared/projects-page/create-task-btn";
import { getProjectTasks } from "@/lib/task";
import TasksTable from "@/components/shared/projects-page/tasks-table";
import ProjectDetails from "@/components/shared/projects-page/project-details";
import TasksTimeline from "@/components/shared/projects-page/tasks-timeline";
import CreateTaskDialog from "@/components/shared/projects-page/create-task-dialog";

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
  const { success: owner, error: ownerError } = await getUserById(
    project.ownerId
  );

  if (tasksError || ownerError) {
    console.error("Error fetching data:", headsError || associatesError);
    return <div>Error loading data. Please try again later.</div>;
  }

  if (!tasks || !owner) {
    return <div>No data available.</div>;
  }

  return (
    <>
      <CreateTaskDialog
        availableAssignees={availableAssignees}
        projectId={project.id}
      />
      <div className="p-6 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-stretch justify-between gap-2">
            <h1 className="text-3xl font-semibold flex-1">{project.title}</h1>
            <ArchiveProjectBtn
              projectId={project.id}
              isArchived={project.isArchived}
            />
            <EditProjectBtn
              admins={JSON.stringify(admins)}
              instructors={JSON.stringify(instructors)}
              project={JSON.stringify(project)}
            />
            <CreateTaskBtn />
          </div>
          <hr />
        </div>
        <ProjectDetails project={project} owner={owner} />
        <h3 className="text-xl font-semibold">Project timeline</h3>
        <TasksTimeline tasks={tasks} />
        <h3 className="text-xl font-semibold">Tasks</h3>
        <TasksTable tasks={tasks} availableAssignees={availableAssignees} />
      </div>
    </>
  );
};

export default ProjectPage;
