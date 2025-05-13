import Courses from "@/components/instructor-access/courses-page/courses";
import CreateCourseBtn from "@/components/instructor-access/courses-page/create-course-btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const InstructorCoursesPage = () => {
  return (
    <div className="p-6 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Manage courses</h1>
          <CreateCourseBtn />
        </div>
        <hr />
      </div>
      <Link href="/courses/archive">
        <Button variant="link">View archived courses</Button>
      </Link>
      <Courses />
    </div>
  );
};

export default InstructorCoursesPage;
