import Announcements from "@/components/shared/courses-page/announcements/announcements";
import CreateAnnouncementBtn from "@/components/shared/courses-page/announcements/create-announcement-btn";

const AnnouncementsPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;

  return (
    <main className="p-6 flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Announcements</h1>
          <CreateAnnouncementBtn />
        </div>
        <hr />
      </header>
      <Announcements courseId={courseId} />
    </main>
  );
};

export default AnnouncementsPage;
