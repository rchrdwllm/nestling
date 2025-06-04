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
import { Skeleton } from "@/components/ui/skeleton";

const Loading = async ({
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
      <div className="p-6 flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <div className="flex items-stretch justify-between gap-2">
            <Skeleton className="h-10 w-28" />
            <div className="flex items-center gap-4 ml-auto">
              <Skeleton className="h-10 w-7" />
              <Skeleton className="h-10 w-7" />
              <Skeleton className="h-10 w-7" />
            </div>
          </div>
          <hr />
        </section>
        <section className="flex flex-col gap-1">
          <Skeleton className="w-[500px] h-5" />
          <Skeleton className="w-[500px] h-5" />
          <Skeleton className="w-[500px] h-5" />
          <Skeleton className="w-[500px] h-5" />
          <Skeleton className="w-[500px] h-5" />
          <Skeleton className="w-[500px] h-5" />
        </section>
        <Skeleton className="h-5 w-20" />
        <section>
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </section>
        <Skeleton className="w-full h-32" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="w-full h-32" />
      </div>
    </>
  );
};

export default Loading;
