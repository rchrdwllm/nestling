import ArchivedCourses from "@/components/shared/courses-page/archived-courses";

const ArchivedCoursesPage = () => {
  return (
    <main className="p-6 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">Archived Courses</h1>
        <hr />
      </div>
      <ArchivedCourses />
    </main>
  );
};

export default ArchivedCoursesPage;
