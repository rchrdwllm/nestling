const AboutPage = () => {
  return (
    <div className="p-6 flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">
          About <span className="text-primary">Nestling</span>
        </h1>
        <hr />
      </div>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">System Information</h1>
        <p className="text-muted-foreground">
          An all-in-one Learning Management System designed designed to
          streamline educational operations within Leave a Nest, particularly
          for the Philippine branch. It offers a range of tools for course
          management, project tracking, secure communication, and analytics.
        </p>
        <p className="font-medium">Modules:</p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Security Module</li>
          <li>Registration Module</li>
          <li>Validation Module</li>
          <li>Search Module</li>
          <li>Course Management Module</li>
          <li>Project Management Tracker Module</li>
          <li>Submission Module</li>
          <li>Inbox Module</li>
          <li>Data Analytics Module</li>
          <li>About Module</li>
          <li>Help Module</li>
        </ul>
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Company Details</h1>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Company Name:</span>{" "}
            Nestling LMS
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">
              Operations Location:
            </span>{" "}
            Philippines
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Mission:</span> To
            empower educational initiatives with a dedicated platform that
            enhances productivity, collaboration, and efficiency across diverse
            learning projects.
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Vision:</span> To
            create a collaborative and secure online space that enhances the
            learning journey for educators and employees, with tools tailored to
            meet modern educational needs.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Contact Information</h1>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Email:</span>{" "}
            support@nestlingLMS.com
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Contact Number:</span>{" "}
            (+63) 993-277-5503
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Office Address:</span>{" "}
            Unit 2103, Orient Square Bldg., F. Ortigas Jr. Rd., Ortigas Center,
            Pasig City 1600
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Support Hours:</span>{" "}
            Monday - Friday, 9:00 AM - 5:00 PM
          </p>
        </div>
      </section>
    </div>
  );

  // return (
  //   <div className="bg-[var(--gray-bg)] min-h-screen flex flex-col">
  //     <div className="sticky top-0 z-50 bg-background py-6 shadow-md">
  //       <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 flex flex-col justify-center items-center h-full">
  //         <p className="mx-auto mt-2 max-w-full text-center text-4xl font-bold tracking-tight text-[var(--nestling-color)] sm:text-7xl break-words">
  //           ABOUT
  //         </p>
  //       </div>
  //     </div>
  //     <div className="flex-1 flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 space-y-6 lg:space-y-0 lg:space-x-6 overflow-y-auto">
  //       <div className="w-full lg:w-3/4 mt-6">
  //         <div
  //           className="w-full max-w-7xl mx-auto space-y-2 mb-12 border border-border
  //         pr-[22px] bg-white rounded-xl p-8 shadow-2xl ml-1 mt-4 z-0 relative"
  //         >
  //           <h1 className="text-2xl font-bold"> SYSTEM INFORMATION </h1>
  //           <div className="space-y-4">
  //             <p>
  //               <span className="font-bold">Name:</span> Nestling LMS
  //             </p>
  //             <p>
  //               <span className="font-bold">Purpose:</span> An all-in-one
  //               Learning Management System designed designed to streamline
  //               educational operations within Leave a Nest, particularly for the
  //               Philippine branch. It offers a range of tools for course
  //               management, project tracking, secure communication, and
  //               analytics.
  //             </p>
  //             <p>
  //               <span className="font-bold">Modules:</span>
  //             </p>
  //             <ul className="list-disc list-inside space-y-2">
  //               <li>Security Module</li>
  //               <li>Registration Module</li>
  //               <li>Validation Module</li>
  //               <li>Search Module</li>
  //               <li>Course Management Module</li>
  //               <li>Project Management Tracker Module</li>
  //               <li>Submission Module</li>
  //               <li>Inbox Module</li>
  //               <li>Data Analytics Module</li>
  //               <li>About Module</li>
  //               <li>Help Module</li>
  //             </ul>
  //             <h1 className="text-2xl font-bold"> COMPANY DETAILS </h1>
  //             <div className="space-y-4">
  //               <p>
  //                 <span className="font-bold">Company Name:</span> Nestling LMS
  //               </p>
  //               <p>
  //                 <span className="font-bold">Operations Location:</span>{" "}
  //                 Philippines
  //               </p>
  //               <p>
  //                 <span className="font-bold">Mission:</span> To empower
  //                 educational initiatives with a dedicated platform that
  //                 enhances productivity, collaboration, and efficiency across
  //                 diverse learning projects.
  //               </p>
  //               <p>
  //                 <span className="font-bold">Vision:</span> To create a
  //                 collaborative and secure online space that enhances the
  //                 learning journey for educators and employees, with tools
  //                 tailored to meet modern educational needs.
  //               </p>
  //             </div>
  //             <h1 className="text-2xl font-bold mt-4 mb-4">
  //               {" "}
  //               CONTACT INFORMATION{" "}
  //             </h1>
  //             <div className="space-y-4">
  //               <p>
  //                 <span className="font-bold">Email:</span>{" "}
  //                 support@nestlingLMS.com
  //               </p>
  //               <p>
  //                 <span className="font-bold">Contact Number:</span> (+63)
  //                 993-277-5503
  //               </p>
  //               <p>
  //                 <span className="font-bold">Office Address:</span> Unit 2103,
  //                 Orient Square Bldg., F. Ortigas Jr. Rd., Ortigas Center, Pasig
  //                 City 1600
  //               </p>
  //               <p>
  //                 <span className="font-bold">Support Hours:</span> Monday -
  //                 Friday, 9:00 AM - 5:00 PM
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       {/* SidePanel Section */}
  //       <div className="w-full lg:w-1/4 lg:sticky lg:top-4 lg:bg-transparent bg-background rounded-lg shadow-md p-6 lg:p-0 lg:shadow-none lg:mt-0 mt-6">
  //         <SidePanel
  //           notifications={[
  //             {
  //               id: "1234-asdfasdf",
  //               type: "inbox",
  //               title: "From John Doe",
  //               message: "asdfalksdghsg",
  //               senderId: "use-uiry2i3uhfs",
  //               url: "/inbox",
  //               createdAt: new Date().toISOString(),
  //               isRead: false,
  //               isArchived: false,
  //               archivedAt: null,
  //               receiverIds: ["use-uiasdsdrew"],
  //             },
  //           ]}
  //           pendingTasks={[
  //             {
  //               name: "Assignment 1.0 - Task Name",
  //               courseCode: "CS101",
  //               courseName: "Introduction to Computer Science",
  //               timeAgo: "8 hours ago",
  //             },
  //           ]}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default AboutPage;
