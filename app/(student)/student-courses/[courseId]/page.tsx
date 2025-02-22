import ModuleCard from "@/components/student-access/courses-page/module-card";
import { getCourseModules } from "@/lib/module";

const CoursePage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const { success: modules, error } = await getCourseModules(courseId);

  if (error) {
    return <div>{error}</div>;
  }

  if (!modules) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {modules.map((module) => (
        <ModuleCard key={module.id} {...module} />
      ))}
    </div>
  );
};

export default CoursePage;
