import ArchivedCourses from "@/components/shared/courses-page/archived-courses";
import Searcher from "@/components/shared/search/general-search/searcher";

const ArchivedCoursesPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};

  return (
    <main className="flex flex-col gap-10 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold text-3xl">Archived Courses</h1>
        <hr />
      </div>
      <ArchivedCourses />
    </main>
  );
};

export default ArchivedCoursesPage;
