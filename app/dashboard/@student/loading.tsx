import { Skeleton } from "@/components/ui/skeleton";

const StudentDashboardPage = () => {
  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-36" />
          <Skeleton className="h-9 w-full flex-1" />
        </div>
        <hr />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-44" />
        </div>
        <section className="grid grid-cols-4 gap-8">
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
        </section>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-64" />
        </div>
        <section className="flex flex-col gap-4">
          <article className="p-4 shadow-sm transition-shadow hover:shadow-md rounded-xl border border-border flex gap-4">
            <Skeleton className="size-10 rounded-full" />
            <div className="cursor-pointer flex-1 flex flex-col gap-2">
              <Skeleton className="size-[14px] w-12" />
              <div className="flex items-center justify-between">
                <Skeleton className="size-[30px] w-48" />
              </div>
              <Skeleton className="size-[14px] w-12" />
              <Skeleton className="size-4 w-full" />
            </div>
          </article>
          <article className="p-4 shadow-sm transition-shadow hover:shadow-md rounded-xl border border-border flex gap-4">
            <Skeleton className="size-10 rounded-full" />
            <div className="cursor-pointer flex-1 flex flex-col gap-2">
              <Skeleton className="size-[14px] w-12" />
              <div className="flex items-center justify-between">
                <Skeleton className="size-[30px] w-48" />
              </div>
              <Skeleton className="size-[14px] w-12" />
              <Skeleton className="size-4 w-full" />
            </div>
          </article>
          <article className="p-4 shadow-sm transition-shadow hover:shadow-md rounded-xl border border-border flex gap-4">
            <Skeleton className="size-10 rounded-full" />
            <div className="cursor-pointer flex-1 flex flex-col gap-2">
              <Skeleton className="size-[14px] w-12" />
              <div className="flex items-center justify-between">
                <Skeleton className="size-[30px] w-48" />
              </div>
              <Skeleton className="size-[14px] w-12" />
              <Skeleton className="size-4 w-full" />
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
