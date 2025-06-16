import ArchivedAnnouncements from "@/components/shared/courses-page/announcements/archived-announcements";
import { Suspense } from "react";
import Searcher from "@/components/shared/search/general-search/searcher";

const ArchivedAnnouncementsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { courseId } = await params;
  const { query, page, tab } = (await searchParams) || {};
  return (
    <main className="flex flex-col gap-6 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <header className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-3xl">Archived Announcements</h1>
        </div>
        <hr />
      </header>
      <ArchivedAnnouncements courseId={courseId} />
    </main>
  );
};

export default ArchivedAnnouncementsPage;
