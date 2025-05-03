const About = () => {
  return (
    <div
      className="w-full max-w-7xl mx-auto space-y-2 mb-12 border border-border 
    pr-[22px] bg-white rounded-xl p-8 shadow-2xl ml-1 mt-4 z-0 relative"
    >
      <h1 className="text-2xl font-bold"> SYSTEM INFORMATION </h1>
      <div className="space-y-4">
        <p>
          <span className="font-bold">Name:</span> Nestling LMS
        </p>
        <p>
          <span className="font-bold">Purpose:</span> An all-in-one Learning
          Management System designed designed to streamline educational
          operations within Leave a Nest, particularly for the Philippine
          branch. It offers a range of tools for course management, project
          tracking, secure communication, and analytics.
        </p>
        <p>
          <span className="font-bold">Modules:</span>
        </p>
        <ul className="list-disc list-inside space-y-2">
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
        <h1 className="text-2xl font-bold"> COMPANY DETAILS </h1>
        <div className="space-y-4">
          <p>
            <span className="font-bold">Company Name:</span> Nestling LMS
          </p>
          <p>
            <span className="font-bold">Operations Location:</span> Philippines
          </p>
          <p>
            <span className="font-bold">Mission:</span> To empower educational
            initiatives with a dedicated platform that enhances productivity,
            collaboration, and efficiency across diverse learning projects.
          </p>
          <p>
            <span className="font-bold">Vision:</span> To create a collaborative
            and secure online space that enhances the learning journey for
            educators and employees, with tools tailored to meet modern
            educational needs.
          </p>
        </div>
        <h1 className="text-2xl font-bold mt-4 mb-4"> CONTACT INFORMATION </h1>
        <div className="space-y-4">
          <p>
            <span className="font-bold">Email:</span> support@nestlingLMS.com
          </p>
          <p>
            <span className="font-bold">Contact Number:</span> (+63)
            993-277-5503
          </p>
          <p>
            <span className="font-bold">Office Address:</span> Unit 2103, Orient
            Square Bldg., F. Ortigas Jr. Rd., Ortigas Center, Pasig City 1600
          </p>
          <p>
            <span className="font-bold">Support Hours:</span> Monday - Friday,
            9:00 AM - 5:00 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
