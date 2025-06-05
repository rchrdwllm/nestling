import EditProjectBtn from "@/components/shared/projects-page/edit-project-btn";
import {
  getProjectAssociates,
  getProjectById,
  getProjectHeads,
} from "@/lib/project";
import {
  getAllAdmins,
  getAllInstructors,
  getOptimisticUser,
  getUserById,
} from "@/lib/user";
import ArchiveProjectBtn from "@/components/admin-access/projects-page/archive-project-btn";
import CreateTaskBtn from "@/components/shared/projects-page/create-task-btn";
import { getProjectTasks } from "@/lib/task";
import TasksTable from "@/components/shared/projects-page/tasks-table";
import ProjectDetails from "@/components/shared/projects-page/project-details";
import TasksTimeline from "@/components/shared/projects-page/tasks-timeline";
import CreateTaskDialog from "@/components/shared/projects-page/create-task-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ErrorToast from "@/components/ui/error-toast";

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
  const user = await getOptimisticUser();

  if (
    projectError ||
    adminsError ||
    instructorsError ||
    !project ||
    !admins ||
    !instructors
  ) {
    return (
      <ErrorToast
        error={
          "Error loading project data: " +
          (projectError || adminsError || instructorsError)
        }
      />
    );
  }

  const { success: heads, error: headsError } = await getProjectHeads(
    project.id
  );
  const { success: associates, error: associatesError } =
    await getProjectAssociates(project.id);

  if (headsError || associatesError || !heads || !associates) {
    return (
      <ErrorToast
        error={"Error loading data: " + (headsError || associatesError)}
      />
    );
  }

  const availableAssignees = [...heads, ...associates];

  const { success: tasks, error: tasksError } = await getProjectTasks(
    project.id
  );
  const { success: owner, error: ownerError } = await getUserById(
    project.ownerId
  );

  if (tasksError || ownerError || !tasks || !owner) {
    return (
      <ErrorToast
        error={"Error loading data: " + (headsError || associatesError)}
      />
    );
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
        <section className="grid grid-cols-2">
          <article className="col-span-2">
            <TasksTimeline tasks={tasks} />
          </article>
        </section>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Tasks</h3>
          <Link href={`/projects/${project.id}/tasks/archive`}>
            <Button variant="link" className="px-0">
              Archived tasks
            </Button>
          </Link>
        </div>
        <TasksTable tasks={tasks} availableAssignees={availableAssignees} />
      </div>
    </>
  );
};

export default ProjectPage;
