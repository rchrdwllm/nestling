import { Skeleton } from "@/components/ui/skeleton";

const Loading = async () => {
  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <Skeleton className="h-9 w-[281px]" />
          <Skeleton className="h-9 w-full flex-1" />
        </div>
        <hr />
      </div>
      <div className="grid grid-cols-6 gap-4">
        <article className="col-span-2">
          <Skeleton className="h-[150px] w-full" />
        </article>
        <article className="col-span-2">
          <Skeleton className="h-[150px] w-full" />
        </article>
        <article className="col-span-2">
          <Skeleton className="h-[150px] w-full" />
        </article>
        <article className="col-span-3">
          <Skeleton className="h-[300px] w-full" />
        </article>
        <article className="col-span-3">
          <Skeleton className="h-[300px] w-full" />
        </article>
        <article className="col-span-6">
          <Skeleton className="h-[500px] w-full" />
        </article>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-40 h-7" />
        <Skeleton className="w-full h-7" />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-7 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
