import MyCourses from "@/components/instructor-access/dashboard-page/my-courses";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import Searcher from "@/components/shared/search/general-search/searcher";
import UpcomingTasks from "@/components/shared/projects-page/upcoming-tasks";

const InstructorDashboardPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};

  return (
    <FadeInWrapper>
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-3xl">Dashboard</h1>
          </div>
          <hr />
        </div>
        <MyCourses />
        <UpcomingTasks />
      </div>
    </FadeInWrapper>
  );
};

export default InstructorDashboardPage;
