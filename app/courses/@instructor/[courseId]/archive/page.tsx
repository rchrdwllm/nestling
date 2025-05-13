import ArchivedModules from "@/components/instructor-access/courses-page/archived-modules";
import { Suspense } from "react";

const ArchivePage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;

  return (
    <main className="p-6 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">Archived modules</h1>
        <hr />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ArchivedModules courseId={courseId} />
      </Suspense>
    </main>
  );
};

export default ArchivePage;
