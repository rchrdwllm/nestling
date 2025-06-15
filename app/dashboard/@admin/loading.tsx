import { Skeleton } from "@/components/ui/skeleton";

const Loading = async () => {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <Skeleton className="w-[281px] h-9" />
        </div>
        <hr />
      </div>
      <div className="gap-4 grid grid-cols-6">
        <article className="col-span-2">
          <Skeleton className="w-full h-[150px]" />
        </article>
        <article className="col-span-2">
          <Skeleton className="w-full h-[150px]" />
        </article>
        <article className="col-span-2">
          <Skeleton className="w-full h-[150px]" />
        </article>
        <article className="col-span-3">
          <Skeleton className="w-full h-[300px]" />
        </article>
        <article className="col-span-3">
          <Skeleton className="w-full h-[300px]" />
        </article>
        <article className="col-span-6">
          <Skeleton className="w-full h-[500px]" />
        </article>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-40 h-7" />
        <Skeleton className="w-full h-7" />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Skeleton className="w-20 h-7" />
            <Skeleton className="w-20 h-7" />
            <Skeleton className="w-20 h-7" />
            <Skeleton className="w-28 h-7" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
