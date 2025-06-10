import { Skeleton } from "@/components/ui/skeleton";

export default function InstructorDashboardLoading() {
  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 flex-1" />
        </div>
        <Skeleton className="h-px w-full" />
      </div>
      <section className="flex flex-col gap-4">
        <Skeleton className="h-7 w-28" />
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
      </section>
    </div>
  );
}
