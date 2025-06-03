import CreateModuleBtn from "@/components/shared/courses-page/create-module-btn";
import ModuleCard from "@/components/shared/courses-page/module-card/module-card";
import { getCourse } from "@/lib/course";
import { getUnarchivedCourseModules } from "@/lib/module";
import { getOptimisticUser } from "@/lib/user";
import { logUserActivity } from "@/server/actions/log-user-activity";
import { viewCourse } from "@/server/actions/view-course";

const CoursePage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const { success: course, error: courseError } = await getCourse(courseId);
  const { success: modules, error: moduleError } =
    await getUnarchivedCourseModules(courseId);
  const user = await getOptimisticUser();

  if (moduleError || courseError) {
    return <div>{moduleError || courseError}</div>;
  }

  if (!modules || !course) {
    return <div>Loading...</div>;
  }

  await logUserActivity({
    type: "view_course",
    userId: user.id,
    targetId: courseId,
    details: {
      courseId,
      courseName: course.name,
      courseCode: course.courseCode,
    },
  });

  await viewCourse({
    courseId,
  });

  return (
    <main className="p-6 flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">
            {course.courseCode} - {course.name}
          </h1>
          <CreateModuleBtn courseId={courseId} />
        </div>
        <hr />
      </header>
      <section className="grid grid-cols-1 gap-4">
        {modules.map((module) => (
          <ModuleCard key={module.id} {...module} />
        ))}
      </section>
    </main>
  );
};

export default CoursePage;
