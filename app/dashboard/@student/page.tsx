import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import MyCourses from "@/components/student-access/dashboard-page/my-courses";
import RecentAnnouncements from "@/components/student-access/dashboard-page/recent-announcements";

const StudentDashboardPage = () => {
  return (
    <FadeInWrapper>
      <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-3xl">Dashboard</h1>
          </div>
          <hr />
        </div>
        <MyCourses />
        <RecentAnnouncements />
      </div>
    </FadeInWrapper>
  );
};

export default StudentDashboardPage;
