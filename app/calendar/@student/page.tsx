import FullCalendar from "@/components/ui/full-calendar";
import { getUpcomingAssignmentsForStudent } from "@/lib/content";
import { getOptimisticUser } from "@/lib/user";

const StudentCalendarPage = async () => {
  const user = await getOptimisticUser();
  const { success: upcomingAssignments, error } =
    await getUpcomingAssignmentsForStudent(user.id);

  if (error) {
    console.error("Error fetching upcoming assignments: ", error);

    return <div>Error fetching upcoming assignments</div>;
  }

  if (!upcomingAssignments) {
    return <div>Loading...</div>;
  }

  return (
    <FullCalendar
      events={
        upcomingAssignments.map((assignment) => ({
          id: assignment.id,
          start: new Date(assignment.startDate!),
          end: new Date(assignment.endDate!),
          title: assignment.title,
          url: `/courses/${assignment.courseId}/modules/content/${assignment.id}`,
          courseId: assignment.courseId,
        })) || []
      }
    />
  );
};

export default StudentCalendarPage;
