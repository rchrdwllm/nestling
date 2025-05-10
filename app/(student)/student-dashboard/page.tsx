import SidePanel from "@/components/student-access/dashboard-page/side-panel";
import SearchBar from "@/components/shared/search/search-bar";
import Announcements from "@/components/student-access/dashboard-page/announcements";

const Dashboard = () => {
  return (
    <div className="bg-[var(--gray-bg)] min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-background py-6 shadow-md">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 flex flex-col justify-center items-center h-full">
          <p className="mx-auto mt-2 max-w-full text-center text-4xl font-bold tracking-tight text-[var(--nestling-color)] sm:text-7xl break-words">
            STUDENT DASHBOARD
          </p>
        </div>
        <div className="sticky top-0 z-50 py-6">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
            <SearchBar entities={["courses", "contents"]} />
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 space-y-6 lg:space-y-0 lg:space-x-6 overflow-y-auto">
        <div className="w-full lg:w-3/4 flex justify-center items-center">
          <Announcements />
        </div>
        <div className="max-w-[400px] lg:sticky lg:top-4 lg:bg-transparent bg-background rounded-lg shadow-md p-6 lg:p-0 lg:shadow-none lg:mt-0 mt-6">
          <SidePanel
            notifications={[
              {
                id: "1234-asdfasdf",
                type: "inbox",
                title: "From John Doe",
                message: "asdfalksdghsg",
                senderId: "use-uiry2i3uhfs",
                url: "/student-inbox",
                createdAt: new Date().toISOString(),
                isRead: false,
                isArchived: false,
                archivedAt: null,
                receiverIds: ["use-uiasdsdrew"],
              },
            ]}
            pendingTasks={[
              {
                name: "Assignment 1.0 - Task Name",
                courseCode: "CS101",
                courseName: "Introduction to Computer Science",
                timeAgo: "8 hours ago",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
