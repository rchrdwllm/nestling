import ProjectTimeline from "@/components/admin-access/projects-page/project-timeline";

const AdminProjectsPage = async () => {
  return (
    <main className="p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <hr />
      </div>
      <ProjectTimeline />
    </main>
  );
};

export default AdminProjectsPage;
