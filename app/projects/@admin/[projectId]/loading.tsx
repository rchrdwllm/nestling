import { Skeleton } from "@/components/ui/skeleton";

const Loading = async () => {
  return (
    <>
      <div className="p-6 flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <div className="flex items-stretch justify-between gap-2">
            <Skeleton className="h-10 w-28" />
            <div className="flex items-center gap-4 ml-auto">
              <Skeleton className="h-10 w-7" />
              <Skeleton className="h-10 w-7" />
              <Skeleton className="h-10 w-7" />
            </div>
          </div>
          <hr />
        </section>
        <section className="flex flex-col gap-1">
          <Skeleton className="w-[500px] h-5" />
          <Skeleton className="w-[500px] h-5" />
          <Skeleton className="w-[500px] h-5" />
          <Skeleton className="w-[500px] h-5" />
          <Skeleton className="w-[500px] h-5" />
          <Skeleton className="w-[500px] h-5" />
        </section>
        <Skeleton className="h-5 w-20" />
        <section>
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </section>
        <Skeleton className="w-full h-32" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="w-full h-32" />
      </div>
    </>
  );
};

export default Loading;
