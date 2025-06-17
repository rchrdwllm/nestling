import { Skeleton } from "@/components/ui/skeleton";

const StudentDashboardPage = () => {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-36 h-9" />
        </div>
        <hr />
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <Skeleton className="w-44 h-7" />
        </div>
        <section className="gap-8 grid grid-cols-4">
          <article className="flex flex-col gap-4 p-4 border border-border rounded-xl">
            <div className="block relative rounded-lg h-40 overflow-hidden">
              <Skeleton className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <Skeleton className="w-full h-4" />
              </div>
              <Skeleton className="w-1/2 h-4" />
            </div>
          </article>
          <article className="flex flex-col gap-4 p-4 border border-border rounded-xl">
            <div className="block relative rounded-lg h-40 overflow-hidden">
              <Skeleton className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <Skeleton className="w-full h-4" />
              </div>
              <Skeleton className="w-1/2 h-4" />
            </div>
          </article>
          <article className="flex flex-col gap-4 p-4 border border-border rounded-xl">
            <div className="block relative rounded-lg h-40 overflow-hidden">
              <Skeleton className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <Skeleton className="w-full h-4" />
              </div>
              <Skeleton className="w-1/2 h-4" />
            </div>
          </article>
          <article className="flex flex-col gap-4 p-4 border border-border rounded-xl">
            <div className="block relative rounded-lg h-40 overflow-hidden">
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
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <Skeleton className="w-64 h-7" />
        </div>
        <section className="flex flex-col gap-4">
          <article className="flex gap-4 shadow-sm hover:shadow-md p-4 border border-border rounded-xl transition-shadow">
            <Skeleton className="rounded-full size-10" />
            <div className="flex flex-col flex-1 gap-2 cursor-pointer">
              <Skeleton className="w-12 size-[14px]" />
              <div className="flex justify-between items-center">
                <Skeleton className="w-48 size-[30px]" />
              </div>
              <Skeleton className="w-12 size-[14px]" />
              <Skeleton className="w-full size-4" />
            </div>
          </article>
          <article className="flex gap-4 shadow-sm hover:shadow-md p-4 border border-border rounded-xl transition-shadow">
            <Skeleton className="rounded-full size-10" />
            <div className="flex flex-col flex-1 gap-2 cursor-pointer">
              <Skeleton className="w-12 size-[14px]" />
              <div className="flex justify-between items-center">
                <Skeleton className="w-48 size-[30px]" />
              </div>
              <Skeleton className="w-12 size-[14px]" />
              <Skeleton className="w-full size-4" />
            </div>
          </article>
          <article className="flex gap-4 shadow-sm hover:shadow-md p-4 border border-border rounded-xl transition-shadow">
            <Skeleton className="rounded-full size-10" />
            <div className="flex flex-col flex-1 gap-2 cursor-pointer">
              <Skeleton className="w-12 size-[14px]" />
              <div className="flex justify-between items-center">
                <Skeleton className="w-48 size-[30px]" />
              </div>
              <Skeleton className="w-12 size-[14px]" />
              <Skeleton className="w-full size-4" />
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
