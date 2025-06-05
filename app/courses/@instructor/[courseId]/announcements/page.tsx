import Announcements from "@/components/shared/courses-page/announcements/announcements";
import CreateAnnouncementBtn from "@/components/shared/courses-page/announcements/create-announcement-btn";
import GenerateAnnouncementsReport from "@/components/shared/courses-page/announcements/generate-announcements-report";
import ErrorToast from "@/components/ui/error-toast";
import { getCourse } from "@/lib/course";

const AnnouncementsPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const { success: course, error } = await getCourse(courseId);

  if (error || !course) {
    return <ErrorToast error={"Error fetching course information: " + error} />;
  }

  return (
    <main className="p-6 flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Announcements</h1>
          <div className="flex gap-4">
            <GenerateAnnouncementsReport
              courseTitle={course.name}
              courseId={courseId}
              courseCode={course.courseCode}
            />
            <CreateAnnouncementBtn />
          </div>
        </div>
        <hr />
      </header>
      <Announcements courseId={courseId} />
    </main>
  );
};

export default AnnouncementsPage;
