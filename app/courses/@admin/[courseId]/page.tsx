import CreateModuleBtn from "@/components/shared/courses-page/create-module-btn";
import ModuleCard from "@/components/shared/courses-page/module-card/module-card";
import ErrorToast from "@/components/ui/error-toast";
import { getCourse } from "@/lib/course";
import { getUnarchivedCourseModules } from "@/lib/module";

const CoursePage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const { success: course, error: courseError } = await getCourse(courseId);
  const { success: modules, error: moduleError } =
    await getUnarchivedCourseModules(courseId);

  if (courseError || moduleError || !modules || !course) {
    return (
      <ErrorToast
        error={
          "Error fetching course or modules: " +
          (courseError || moduleError || "")
        }
      />
    );
  }

  return (
    <main className="p-6 flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Modules</h1>
          <CreateModuleBtn courseId={courseId} />
        </div>
        <hr />
      </header>
      <section className="grid grid-cols-1 gap-4">
        {!modules.length ? (
          <p className="text-muted-foreground">No modules found</p>
        ) : (
          modules.map((module) => <ModuleCard key={module.id} {...module} />)
        )}
      </section>
    </main>
  );
};

export default CoursePage;
