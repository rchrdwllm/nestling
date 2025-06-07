import MyCourses from "@/components/instructor-access/dashboard-page/my-courses";
import SearchBar from "@/components/shared/search/search-bar";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";

const InstructorDashboardPage = async () => {
  return (
    <FadeInWrapper>
      <div className="p-6 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <div className="flex-1">
              <SearchBar
                entities={["students", "instructors", "courses", "contents"]}
              />
            </div>
          </div>
          <hr />
        </div>
        <MyCourses />
      </div>
    </FadeInWrapper>
  );
};

export default InstructorDashboardPage;
