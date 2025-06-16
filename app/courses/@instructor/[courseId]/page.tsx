import CreateModuleBtn from "@/components/shared/courses-page/create-module-btn";
import ModuleCard from "@/components/shared/courses-page/module-card/module-card";
import TrackCourseEngagement from "@/components/shared/courses-page/track-course-engagement";
import ErrorToast from "@/components/ui/error-toast";
import { getCourse } from "@/lib/course";
import { getUnarchivedCourseModules } from "@/lib/module";
import Searcher from "@/components/shared/search/general-search/searcher";

const CoursePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { courseId } = await params;
  const { query, page, tab } = (await searchParams) || {};
  const { success: course, error: courseError } = await getCourse(courseId);
  const { success: modules, error: moduleError } =
    await getUnarchivedCourseModules(courseId);

  if (courseError || !course || moduleError || !modules) {
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
    <main className="flex flex-col gap-8 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <header className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-3xl">Modules</h1>
          <CreateModuleBtn courseId={courseId} />
        </div>
        <hr />
      </header>
      <section className="gap-4 grid grid-cols-1">
        {!modules.length ? (
          <p className="text-muted-foreground">No modules found</p>
        ) : (
          modules.map((module) => <ModuleCard key={module.id} {...module} />)
        )}
      </section>
      <TrackCourseEngagement course={course} />
    </main>
  );
};

export default CoursePage;
