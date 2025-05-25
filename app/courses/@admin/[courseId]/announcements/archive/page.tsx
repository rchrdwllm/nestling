import ArchivedAnnouncements from "@/components/instructor-access/courses-page/announcements/archived-announcements";
import { Suspense } from "react";

const ArchivedAnnouncementsPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;

  return (
    <main className="p-6 flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Archived Announcements</h1>
        </div>
        <hr />
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <ArchivedAnnouncements courseId={courseId} />
      </Suspense>
    </main>
  );
};

export default ArchivedAnnouncementsPage;
