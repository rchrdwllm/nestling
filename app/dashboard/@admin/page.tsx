import ActiveUsers from "@/components/admin-access/dashboard-page/active-users";
import MostViewedCourses from "@/components/admin-access/dashboard-page/most-viewed-courses";
import TopCourses from "@/components/admin-access/dashboard-page/top-courses";
import TotalInstructorsOverview from "@/components/admin-access/dashboard-page/total-instructors-overview";
import TotalProjectsOverview from "@/components/admin-access/dashboard-page/total-projects-overview";
import TotalStudentsOverview from "@/components/admin-access/dashboard-page/total-students-overview";
import UserEventLogs from "@/components/admin-access/dashboard-page/user-events/user-event-logs";
import SearchBar from "@/components/shared/search/search-bar";
import ErrorToast from "@/components/ui/error-toast";
import { getMostViewedCourses, getTopCoursesByEnrollments } from "@/lib/course";
import { getActiveUsersFromMonths } from "@/lib/monthly-activity";

const AdminDashboardPage = async () => {
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

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <div className="flex-1">
            <SearchBar />
          </div>
        </div>
        <hr />
      </div>
      <div className="grid grid-cols-6 gap-4">
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
        <article className="col-span-6">
          <ActiveUsers monthlyActiveUsers={activeUsers.monthlyActiveUsers} />
        </article>
      </div>
      <div className="flex flex-col gap-4">
        <UserEventLogs />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
