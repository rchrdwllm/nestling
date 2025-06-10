import CreateCourseBtn from "@/components/shared/courses-page/create-course-btn";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className="p-6 flex flex-col gap-4 h-[calc(100vh-1rem)]">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-10 w-36" />
        </div>
        <hr />
      </div>
      <div className="grid grid-cols-4 gap-8">
        <article className="p-4 rounded-xl border border-border flex flex-col gap-4">
          <div className="block h-40 relative rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Skeleton className="w-full h-4" />
            </div>
            <Skeleton className="w-1/2 h-4" />
          </div>
        </article>
        <article className="p-4 rounded-xl border border-border flex flex-col gap-4">
          <div className="block h-40 relative rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Skeleton className="w-full h-4" />
            </div>
            <Skeleton className="w-1/2 h-4" />
          </div>
        </article>
        <article className="p-4 rounded-xl border border-border flex flex-col gap-4">
          <div className="block h-40 relative rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Skeleton className="w-full h-4" />
            </div>
            <Skeleton className="w-1/2 h-4" />
          </div>
        </article>
        <article className="p-4 rounded-xl border border-border flex flex-col gap-4">
          <div className="block h-40 relative rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Skeleton className="w-full h-4" />
            </div>
            <Skeleton className="w-1/2 h-4" />
          </div>
        </article>
        <article className="p-4 rounded-xl border border-border flex flex-col gap-4">
          <div className="block h-40 relative rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Skeleton className="w-full h-4" />
            </div>
            <Skeleton className="w-1/2 h-4" />
          </div>
        </article>
        <article className="p-4 rounded-xl border border-border flex flex-col gap-4">
          <div className="block h-40 relative rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Skeleton className="w-full h-4" />
            </div>
            <Skeleton className="w-1/2 h-4" />
          </div>
        </article>
        <article className="p-4 rounded-xl border border-border flex flex-col gap-4">
          <div className="block h-40 relative rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Skeleton className="w-full h-4" />
            </div>
            <Skeleton className="w-1/2 h-4" />
          </div>
        </article>
        <article className="p-4 rounded-xl border border-border flex flex-col gap-4">
          <div className="block h-40 relative rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Skeleton className="w-full h-4" />
            </div>
            <Skeleton className="w-1/2 h-4" />
          </div>
        </article>
      </div>
    </main>
  );
};

export default Loading;
