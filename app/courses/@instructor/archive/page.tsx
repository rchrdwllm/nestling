import ArchivedCourses from "@/components/shared/courses-page/archived-courses";
import { Suspense } from "react";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import Searcher from "@/components/shared/search/general-search/searcher";
import { getOptimisticUser } from "@/lib/user";
import Unauthorized from "@/components/ui/unauthorized";

const ArchivedCoursesPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};
  const user = await getOptimisticUser();

  if (user.role !== "instructor") return <Unauthorized />;

  return (
    <FadeInWrapper className="flex flex-col gap-10 p-6">
      <main>
        <Searcher query={query} page={page} tab={tab} />
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-3xl">Archived Courses</h1>
          <hr />
        </div>
        <ArchivedCourses />
      </main>
    </FadeInWrapper>
  );
};

export default ArchivedCoursesPage;
