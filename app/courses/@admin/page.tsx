import Courses from "@/components/admin-access/courses-page/courses";
import CreateCourseBtn from "@/components/shared/courses-page/create-course-btn";
import { getAllInstructors } from "@/lib/user";

const AdminCoursesPage = async () => {
  const { success: instructors, error } = await getAllInstructors();

  if (error || !instructors) {
    return <h1>Error fetching instructors: {error}</h1>;
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Courses</h1>
          <CreateCourseBtn instructors={instructors} isAdmin />
        </div>
        <hr />
      </div>
      <Courses />
    </div>
  );
};

export default AdminCoursesPage;
