import ArchivedCourses from "@/components/shared/courses-page/archived-courses";
import { Suspense } from "react";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import Searcher from "@/components/shared/search/general-search/searcher";

const ArchivedCoursesPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};

  return (
    <FadeInWrapper className="p-6 flex flex-col gap-10">
      <main >
        <Searcher query={query} page={page} tab={tab} />
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">Archived Courses</h1>
          <hr />
        </div>
        <ArchivedCourses />
      </main>
    </FadeInWrapper>
  );
};

export default ArchivedCoursesPage;
