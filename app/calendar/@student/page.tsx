import FullCalendar from "@/components/ui/full-calendar";
import { getUpcomingAssignmentsForStudent } from "@/lib/content";
import { getOptimisticUser } from "@/lib/user";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import ErrorToast from "@/components/ui/error-toast";

const StudentCalendarPage = async () => {
  const user = await getOptimisticUser();
  const { success: upcomingAssignments, error } =
    await getUpcomingAssignmentsForStudent(user.id);

  if (error || !upcomingAssignments) {
    return (
      <ErrorToast error={"Failed to fetch upcoming assignments: " + error} />
    );
  }

  return (
    <FadeInWrapper>
      <FullCalendar
        events={
          upcomingAssignments.map((assignment) => ({
            id: assignment.id,
            start: new Date(assignment.startDate!),
            end: new Date(assignment.endDate!),
            title: assignment.title,
            url: `/courses/${assignment.courseId}/modules/content/${assignment.id}`,
            courseId: assignment.courseId,
            type: "assignment",
          })) || []
        }
      />
    </FadeInWrapper>
  );
};

export default StudentCalendarPage;
