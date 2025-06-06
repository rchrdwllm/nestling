import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import SearchBar from "@/components/shared/search/search-bar";
import MyCourses from "@/components/student-access/dashboard-page/my-courses";
import RecentAnnouncements from "@/components/student-access/dashboard-page/recent-announcements";

const StudentDashboardPage = () => {
  return (
    <FadeInWrapper>
      <div className="p-6 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <div className="flex-1">
              <SearchBar entities={["students", "courses"]} />
            </div>
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
