import TrackCourseEngagement from "@/components/shared/courses-page/track-course-engagement";
import ModuleCard from "@/components/student-access/courses-page/module-card";
import ErrorToast from "@/components/ui/error-toast";
import { getCourse } from "@/lib/course";
import { getPublishedCourseModules } from "@/lib/module";
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
    await getPublishedCourseModules(courseId);

  if (courseError || !course || !modules || moduleError) {
    return <ErrorToast error={"Error fetching course: " + courseError} />;
  }
  return (
    <div className="flex flex-col gap-8 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold text-3xl">Modules</h1>
        <hr />
      </div>
      <div className="gap-4 grid grid-cols-1">
        {!modules.length ? (
          <p className="text-muted-foreground">No modules found</p>
        ) : (
          modules.map((module) => <ModuleCard key={module.id} {...module} />)
        )}
      </div>
      <TrackCourseEngagement course={course} />
    </div>
  );
};

export default CoursePage;
