import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <section className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-9 w-[71px]" />
          <Skeleton className="h-9 w-[71px]" />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="h-4 w-[90px]" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-[75px]" />
          <Skeleton className="h-9 w-9" />
        </div>
      </section>
      <Skeleton className="h-full flex-1 w-full" />
    </div>
  );
};

export default Loading;
