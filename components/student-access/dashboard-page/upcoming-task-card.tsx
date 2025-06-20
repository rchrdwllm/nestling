import { Card } from "@/components/ui/card";
import { Content } from "@/types";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { isPast } from "date-fns";
import { cn, getDueText } from "@/lib/utils";
import { getCourse } from "@/lib/course";
import ErrorToast from "@/components/ui/error-toast";
import ClickableCourseBadge from "./clickable-course-badge";

const UpcomingTaskCard = async ({ title, endDate, courseId, id }: Content) => {
  const dueDate = getDueText(endDate!);
  const { success: course, error: courseError } = await getCourse(courseId);

  if (courseError || !course) {
    return <ErrorToast error={"Error fetching course: " + courseError} />;
  }

  return (
    <Link href={`/courses/${courseId}/modules/content/${id}`}>
      <Card className="flex flex-col gap-1 hover:shadow-md p-4 transition-shadow">
        <div>
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ClickableCourseBadge
            courseId={courseId}
            courseCode={course.courseCode}
          />
          <p
            className={cn(
              "flex flex-wrap items-center gap-1 text-muted-foreground text-xs",
              isPast(new Date(endDate!))
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Calendar className="size-3" /> <span>{dueDate}</span>
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default UpcomingTaskCard;
