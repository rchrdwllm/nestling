import AssignmentsTable from "@/components/shared/courses-page/assignments/assignments-table";
import { assignmentsTableDef } from "@/components/shared/courses-page/assignments/assignments-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getCourseAssignments } from "@/lib/content";

const AssignmentsPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const { success: assignments, error: assignmentsError } =
    await getCourseAssignments(courseId);

  if (assignmentsError || !assignments) {
    return (
      <ErrorToast error={"Error fetching assignments: " + assignmentsError} />
    );
  }

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Assignments</h1>
        <hr />
      </div>
      <AssignmentsTable columns={assignmentsTableDef} data={assignments} />
    </div>
  );
};

export default AssignmentsPage;
