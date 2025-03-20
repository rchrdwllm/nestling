import { Button } from "@/components/ui/button";
import { archiveCourse } from "@/server/actions/archive-course";
import { Course } from "@/types";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type ArchiveCourseBtnProps = {
  course: string;
};

const ArchiveCourseBtn = ({ course }: ArchiveCourseBtnProps) => {
  const courseData = JSON.parse(course) as Course;
  const { execute } = useAction(archiveCourse, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();
        toast.success(data.success);
      } else if (data?.error) {
        toast.dismiss();
        toast.error(data.error as string);
      }
    },
    onError: ({ error }) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));
    },
  });

  return (
    <Button
      onClick={() => execute({ courseId: courseData.id })}
      variant="ghost"
      className="text-sm text-left block w-full px-2 py-1.5 font-normal"
    >
      {courseData.isArchived ? "Unarchive" : "Archive"} course
    </Button>
  );
};

export default ArchiveCourseBtn;
