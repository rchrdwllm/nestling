import MyCourses from "@/components/instructor-access/dashboard-page/my-courses";
import SearchBar from "@/components/shared/search/search-bar";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";

const InstructorDashboardPage = async () => {
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
      </div>
    </FadeInWrapper>
  );
};

export default InstructorDashboardPage;
