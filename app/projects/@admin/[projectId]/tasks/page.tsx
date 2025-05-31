import { redirect } from "next/navigation";

const TasksPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  return redirect(`/projects/${projectId}`);
};

export default TasksPage;
