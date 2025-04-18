import ModuleCard from "@/components/student-access/courses-page/module-card";
import { getCourse } from "@/lib/course";
import { getPublishedCourseModules } from "@/lib/module";

const CoursePage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const { success: course, error: courseError } = await getCourse(courseId);
  const { success: modules, error: moduleError } =
    await getPublishedCourseModules(courseId);

  if (moduleError || courseError) {
    return <div>{moduleError || courseError}</div>;
  }

  if (!modules || !course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">
          {course.courseCode} - {course.name}
        </h1>
        <hr />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {modules.map((module) => (
          <ModuleCard key={module.id} {...module} />
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
