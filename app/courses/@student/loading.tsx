import { Skeleton } from "@/components/ui/skeleton";

const CoursesPage = () => {
  return (
    <main className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Skeleton className="font-semibold h-9 w-32" />
        <hr />
      </div>
      <Skeleton className="h-7 w-48" />
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
      <Skeleton className="h-7 w-48" />
      <section className="flex justify-between items-center">
        <Skeleton className="h-10 max-w-sm" />
        <div className="flex items-center gap-4">
          <Skeleton className="w-36 h-10" />
          <Skeleton className="w-36 h-10" />
        </div>
      </section>
    </main>
  );
};

export default CoursesPage;
