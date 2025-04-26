import Announcements from "@/components/student-access/courses-page/announcements/announcements";
import { Suspense } from "react";

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
        </div>
        <hr />
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Announcements courseId={courseId} />
      </Suspense>
    </main>
  );
};

export default AnnouncementsPage;
