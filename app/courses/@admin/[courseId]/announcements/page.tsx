import Announcements from "@/components/shared/courses-page/announcements/announcements";
import CreateAnnouncementBtn from "@/components/shared/courses-page/announcements/create-announcement-btn";
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
  return (
    <main className="p-6 flex flex-col gap-6">
      <Searcher query={query} page={page} tab={tab} />
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
