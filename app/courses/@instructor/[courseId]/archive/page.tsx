import ArchivedModules from "@/components/shared/courses-page/archived-modules";
import { Suspense } from "react";
import Searcher from "@/components/shared/search/general-search/searcher";

const ArchivePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { courseId } = await params;
  const { query, page, tab } = (await searchParams) || {};
  return (
    <main className="flex flex-col gap-10 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold text-3xl">Archived modules</h1>
        <hr />
      </div>
      <ArchivedModules courseId={courseId} />
    </main>
  );
};

export default ArchivePage;
