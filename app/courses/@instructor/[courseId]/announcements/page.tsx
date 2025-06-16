import Announcements from "@/components/shared/courses-page/announcements/announcements";
import CreateAnnouncementBtn from "@/components/shared/courses-page/announcements/create-announcement-btn";
import GenerateAnnouncementsReport from "@/components/shared/courses-page/announcements/generate-announcements-report";
import ErrorToast from "@/components/ui/error-toast";
import { getCourse } from "@/lib/course";
import Searcher from "@/components/shared/search/general-search/searcher";

const AnnouncementsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { courseId } = await params;
  const { query, page, tab } = (await searchParams) || {};
  const { success: course, error } = await getCourse(courseId);

  if (error || !course) {
    return <ErrorToast error={"Error fetching course information: " + error} />;
  }
  return (
    <main className="flex flex-col gap-6 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <header className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-3xl">Announcements</h1>
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
