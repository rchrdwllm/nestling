import MyCourses from "@/components/student-access/dashboard-page/my-courses";
import RecentAnnouncements from "@/components/student-access/dashboard-page/recent-announcements";

const StudentDashboardPage = () => {
  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <hr />
      </div>
      <MyCourses />
      <RecentAnnouncements />
    </div>
  );
};

export default StudentDashboardPage;
