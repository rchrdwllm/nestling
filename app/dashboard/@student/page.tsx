import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import MyCourses from "@/components/student-access/dashboard-page/my-courses";
import RecentAnnouncements from "@/components/student-access/dashboard-page/recent-announcements";
import Searcher from "@/components/shared/search/general-search/searcher";
import UpcomingTasks from "@/components/student-access/dashboard-page/upcoming-tasks";
import { getOptimisticUser } from "@/lib/user";
import Unauthorized from "@/components/ui/unauthorized";
import CurrentDate from "@/components/shared/current-date";

const StudentDashboardPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const user = await getOptimisticUser();

  if (user.role !== "student") return <Unauthorized />;

  const { query, page, tab } = (await searchParams) || {};

  return (
    <FadeInWrapper>
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-3xl">Dashboard</h1>
            <CurrentDate />
          </div>
          <hr />
        </div>
        <MyCourses />
        <RecentAnnouncements />
        <UpcomingTasks />
      </div>
    </FadeInWrapper>
  );
};

export default StudentDashboardPage;
