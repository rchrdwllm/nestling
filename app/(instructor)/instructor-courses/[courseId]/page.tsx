import ModuleCard from "@/components/student-access/courses-page/module-card";
import { getCourse } from "@/lib/course";
import { getCourseModules } from "@/lib/module";

const CoursePage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const { success: course, error: courseError } = await getCourse(courseId);
  const { success: modules, error: moduleError } = await getCourseModules(
    courseId
  );

  if (moduleError || courseError) {
    return <div>{moduleError || courseError}</div>;
  }

  if (!modules || !course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{course.name}</h1>
      {modules.map((module) => (
        <ModuleCard key={module.id} {...module} />
      ))}
    </div>
  );
};

export default CoursePage;
