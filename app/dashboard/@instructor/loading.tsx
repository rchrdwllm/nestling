import { Skeleton } from "@/components/ui/skeleton";

export default function InstructorDashboardLoading() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-40 h-10" />
        </div>
        <Skeleton className="w-full h-px" />
      </div>
      <section className="flex flex-col gap-4">
        <Skeleton className="w-28 h-7" />
        <div className="gap-8 grid grid-cols-4">
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
        </div>
      </section>
    </div>
  );
}
