import GenerateGradesReport from "@/components/shared/courses-page/grading/generate-grades-report";
import GradeStudentCard from "@/components/shared/courses-page/grading/grade-student-card";
import ErrorToast from "@/components/ui/error-toast";
import { getCourseAssignments } from "@/lib/content";
import { getEnrolledStudents } from "@/lib/course";
import { generateGradesReport } from "@/lib/report";

const GradePage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const { success: assignments, error: assignmentsError } =
    await getCourseAssignments(courseId);
  const { success: enrolledStudents, error: enrolledStudentsError } =
    await getEnrolledStudents(courseId);

  if (assignmentsError || !assignments) {
    return (
      <ErrorToast error={"Error fetching assignments: " + assignmentsError} />
    );
  }

  if (enrolledStudentsError || !enrolledStudents) {
    return (
      <ErrorToast
        error={"Error fetching enrolled students: " + enrolledStudentsError}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Grade assignments</h1>
          <GenerateGradesReport
            studentIds={enrolledStudents.map((student) => student.id)}
            courseId={courseId}
          />
        </div>
        <hr />
      </div>
      <section className="flex flex-col gap-4">
        {enrolledStudents.length ? (
          <p className="text-muted-foreground">No students found</p>
        ) : (
          enrolledStudents.map((student) => (
            <GradeStudentCard
              key={student.id}
              {...student}
              assignments={assignments}
              courseId={courseId}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default GradePage;
