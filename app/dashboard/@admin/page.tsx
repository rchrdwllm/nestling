import ActiveUsers from "@/components/admin-access/active-users";
import TotalInstructorsOverview from "@/components/admin-access/total-instructors-overview";
import TotalProjectsOverview from "@/components/admin-access/total-projects-overview";
import TotalStudentsOverview from "@/components/admin-access/total-students-overview";
import SearchBar from "@/components/shared/search/search-bar";
import { getActiveUsersFromMonths } from "@/lib/user-activity";

const AdminDashboardPage = async () => {
  const { success: activeUsers } = await getActiveUsersFromMonths(6);

  if (!activeUsers) return <h1>Loading...</h1>;

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <div className="flex-1">
            <SearchBar />
          </div>
        </div>
        <hr />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <TotalStudentsOverview />
        <TotalInstructorsOverview />
        <TotalProjectsOverview />
      </div>
      <ActiveUsers monthlyActiveUsers={activeUsers.monthlyActiveUsers} />
    </div>
  );
};

export default AdminDashboardPage;
