import About from "@/components/student-access/about-page/about";
import SidePanel from "@/components/student-access/dashboard-page/side-panel";

const AboutPage = () => {
  return (
    <div className="bg-[var(--gray-bg)] min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-background py-6 shadow-md">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 flex flex-col justify-center items-center h-full">
          <p className="mx-auto mt-2 max-w-full text-center text-4xl font-bold tracking-tight text-[var(--nestling-color)] sm:text-7xl break-words">
            ABOUT
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 space-y-6 lg:space-y-0 lg:space-x-6 overflow-y-auto">
        <div className="w-full lg:w-3/4 mt-6">
          <About />
        </div>

        {/* SidePanel Section */}
        <div className="w-full lg:w-1/4 lg:sticky lg:top-4 lg:bg-transparent bg-background rounded-lg shadow-md p-6 lg:p-0 lg:shadow-none lg:mt-0 mt-6">
          <SidePanel
            notifications={[
              {
                id: "1234-asdfasdf",
                type: "inbox",
                title: "From John Doe",
                message: "asdfalksdghsg",
                senderId: "use-uiry2i3uhfs",
                url: "/inbox",
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

export default AboutPage;
