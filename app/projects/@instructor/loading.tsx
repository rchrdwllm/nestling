import { Skeleton } from "@/components/ui/skeleton";

const Loading = async () => {
  return (
    <main className="h-full p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Projects Dashboard</h1>
        <hr />
      </div>
      <section className="grid grid-cols-2 gap-4 pb-6">
        <article className="col-span-2">
          <div>
            <div className="flex justify-between items-center gap-4">
              <Skeleton className="w-24 h-10" />
              <Skeleton className="w-20 h-10" />
              <Skeleton className="w-28 h-10 ml-auto" />
            </div>
            <Skeleton className="w-full h-40" />
          </div>
        </article>
        <article className="col-span-2">
          <div className="flex justify-between items-center gap-4">
            <Skeleton className="w-28 h-10 mr-auto" />
            <Skeleton className="w-20 h-10" />
            <Skeleton className="w-20 h-10" />
          </div>
          <Skeleton className="w-full h-40" />
        </article>
        <article className="min-h-[378px]">
          <Skeleton className="size-full" />
        </article>
        <article className="min-h-[378px]">
          <Skeleton className="size-full" />
        </article>
        <article className="min-h-[378px] col-span-2">
          <Skeleton className="size-full" />
        </article>
      </section>
    </main>
  );
};

export default Loading;
