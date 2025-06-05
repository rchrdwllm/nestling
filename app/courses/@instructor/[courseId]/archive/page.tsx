import ArchivedModules from "@/components/shared/courses-page/archived-modules";
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
      <ArchivedModules courseId={courseId} />
    </main>
  );
};

export default ArchivePage;
