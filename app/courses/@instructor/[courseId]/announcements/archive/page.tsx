import ArchivedAnnouncements from "@/components/shared/courses-page/announcements/archived-announcements";
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
      <ArchivedAnnouncements courseId={courseId} />
    </main>
  );
};

export default ArchivedAnnouncementsPage;
