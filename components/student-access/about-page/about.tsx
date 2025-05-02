import SidePanel from "../dashboard-page/side-panel";

const About = () => {

    return (
        <div className="w-full lg:w-1/4 lg:sticky lg:top-4 lg:bg-transparent bg-background rounded-lg shadow-md p-6 lg:p-0 lg:shadow-none lg:mt-0 mt-6">
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
       
    )
};
export default About;