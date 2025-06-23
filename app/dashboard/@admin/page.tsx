import ActiveUsers from "@/components/admin-access/dashboard-page/active-users";
import MostViewedCourses from "@/components/admin-access/dashboard-page/most-viewed-courses";
import TopCourses from "@/components/admin-access/dashboard-page/top-courses";
import TotalInstructorsOverview from "@/components/admin-access/dashboard-page/total-instructors-overview";
import TotalProjectsOverview from "@/components/admin-access/dashboard-page/total-projects-overview";
import TotalStudentsOverview from "@/components/admin-access/dashboard-page/total-students-overview";
import UserEventLogs from "@/components/admin-access/dashboard-page/user-events/user-event-logs";
import ErrorToast from "@/components/ui/error-toast";
import { getMostViewedCourses, getTopCoursesByEnrollments } from "@/lib/course";
import { getActiveUsersFromMonths } from "@/lib/monthly-activity";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import Searcher from "@/components/shared/search/general-search/searcher";
import UpcomingTasks from "@/components/admin-access/dashboard-page/upcoming-tasks";
import { getOptimisticUser } from "@/lib/user";
import Unauthorized from "@/components/ui/unauthorized";

const AdminDashboardPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const user = await getOptimisticUser();

  if (user.role !== "admin") return <Unauthorized />;

  const { success: activeUsers, error: activeUsersError } =
    await getActiveUsersFromMonths(6);
  const { success: topCourses, error: topCoursesError } =
    await getTopCoursesByEnrollments();
  const { success: mostViewedCourses, error: mostViewedCoursesError } =
    await getMostViewedCourses();

  if (
    !activeUsers ||
    !topCourses ||
    activeUsersError ||
    topCoursesError ||
    !mostViewedCourses ||
    mostViewedCoursesError
  )
    return (
      <ErrorToast
        error={"Error fetching dashboard data: " + mostViewedCoursesError}
      />
    );

  const { query, page, tab } = (await searchParams) || {};

  return (
    <FadeInWrapper>
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-6">
            <h1 className="font-semibold text-3xl">Admin Dashboard</h1>
          </div>
          <hr />
        </div>
        <div className="gap-4 grid grid-cols-6">
          <article className="col-span-2">
            <TotalStudentsOverview />
          </article>
          <article className="col-span-2">
            <TotalInstructorsOverview />
          </article>
          <article className="col-span-2">
            <TotalProjectsOverview />
          </article>
          <article className="col-span-3">
            <MostViewedCourses data={mostViewedCourses} />
          </article>
          <article className="col-span-3">
            <TopCourses data={topCourses} />
          </article>
          <article className="col-span-3">
            <ActiveUsers monthlyActiveUsers={activeUsers.monthlyActiveUsers} />
          </article>
          <article className="col-span-3">
            <UpcomingTasks />
          </article>
        </div>
        <div className="flex flex-col gap-4">
          <UserEventLogs />
        </div>
      </div>
    </FadeInWrapper>
  );
};

export default AdminDashboardPage;
